-- KVN CLOTHING · TRENDING EMOTES! — server-only public analytics
-- Location: ServerScriptService/KVNPublicAnalytics.server.lua
-- Does NOT contain or request any Roblox API key.
-- Server fetches the *publicly approved* dashboard endpoint once per ten minutes.
-- Set Game Settings > Security > Allow HTTP Requests = On in Roblox Studio.

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ANALYTICS_URL = "https://trending-emotes-dashboard.k-backx.workers.dev/api/public-analytics"
local UPDATE_SECONDS = 600

local remote = ReplicatedStorage:FindFirstChild("KVNPublicAnalyticsEvent")
if not remote then
	remote = Instance.new("RemoteEvent")
	remote.Name = "KVNPublicAnalyticsEvent"
	remote.Parent = ReplicatedStorage
end

local lastSnapshot = {
	state = "loading",
	dau = nil,
	sessionMinutes = nil,
	date = nil,
}

local function goodNumber(n, maximum)
	return typeof(n) == "number" and n == n and n >= 0 and n < maximum
end

local function readMetric(metrics, name, maxValue)
	for _, item in ipairs(metrics) do
		if typeof(item) == "table" and item.id == name and item.state == "ready"
			and typeof(item.latest) == "table" and goodNumber(item.latest.value, maxValue)
			and typeof(item.latest.date) == "string" and string.match(item.latest.date, "^%d%d%d%d%-%d%d%-%d%d$") then
			return item.latest.value, item.latest.date
		end
	end
	return nil, nil
end

local function publish(newSnapshot)
	lastSnapshot = newSnapshot
	remote:FireAllClients(newSnapshot)
end

local function refresh()
	local ok, response = pcall(function()
		-- RequestAsync exposes HTTP status instead of throwing away the status.
		return HttpService:RequestAsync({
			Url = ANALYTICS_URL,
			Method = "GET",
			Headers = { Accept = "application/json" },
		})
	end)

	if not ok or not response.Success then
		warn("[KVN Analytics] Public endpoint unavailable (check HTTP Requests and Cloudflare)")
		publish({ state = "unavailable" })
		return
	end

	local parsed, payload = pcall(function()
		return HttpService:JSONDecode(response.Body)
	end)
	if not parsed or typeof(payload) ~= "table"
		or typeof(payload.metrics) ~= "table"
		or (payload.state ~= "ready" and payload.state ~= "partial") then
		publish({ state = "unavailable" })
		return
	end

	local dau, dauDate = readMetric(payload.metrics, "DailyActiveUsers", 1000000000)
	local session, sessionDate = readMetric(payload.metrics, "AverageSessionLengthMinutes", 100000)

	publish({
		state = (dau ~= nil or session ~= nil) and "ready" or "unavailable",
		dau = dau,
		sessionMinutes = session,
		dauDate = dauDate,
		sessionDate = sessionDate,
	})
end

-- A client can request the LAST cached data, never trigger a new HTTP request.
remote.OnServerEvent:Connect(function(player, action)
	if action == "snapshot" then
		remote:FireClient(player, lastSnapshot)
	end
end)

task.spawn(function()
	while true do
		refresh()
		task.wait(UPDATE_SECONDS)
	end
end)
