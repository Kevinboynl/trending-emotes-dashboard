-- KVN CLOTHING · TRENDING EMOTES! — compact optional in-game analytics
-- Location: StarterPlayer/StarterPlayerScripts/KVNPublicAnalytics.client.lua
-- Shows only approved aggregate values; never sees the private Roblox key.

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local remote = ReplicatedStorage:WaitForChild("KVNPublicAnalyticsEvent")
local playerGui = player:WaitForChild("PlayerGui")

local old = playerGui:FindFirstChild("KVNPublicAnalyticsGui")
if old then old:Destroy() end

local gui = Instance.new("ScreenGui")
gui.Name = "KVNPublicAnalyticsGui"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = false
gui.DisplayOrder = 8
gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
gui.Parent = playerGui

local BLUE = Color3.fromRGB(37, 99, 255)
local CYAN = Color3.fromRGB(110, 207, 255)
local WHITE = Color3.fromRGB(248, 250, 255)
local MUTED = Color3.fromRGB(150, 170, 205)
local SURFACE = Color3.fromRGB(10, 22, 51)

local function rounded(obj, pixels)
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, pixels)
	corner.Parent = obj
	return obj
end

local function label(parent, text, position, size, fontSize, color, bold)
	local item = Instance.new("TextLabel")
	item.BackgroundTransparency = 1
	item.Text = text
	item.TextColor3 = color
	item.TextSize = fontSize
	item.Font = bold and Enum.Font.GothamBold or Enum.Font.Gotham
	item.TextXAlignment = Enum.TextXAlignment.Left
	item.TextYAlignment = Enum.TextYAlignment.Center
	item.TextTruncate = Enum.TextTruncate.AtEnd
	item.Size = size
	item.Position = position
	item.Parent = parent
	return item
end

local toggle = Instance.new("TextButton")
toggle.Name = "OpenStats"
toggle.Text = "📊  GAME STATS"
toggle.TextSize = 13
toggle.Font = Enum.Font.GothamBold
toggle.TextColor3 = WHITE
toggle.BackgroundColor3 = BLUE
toggle.AutoButtonColor = true
toggle.AnchorPoint = Vector2.new(1, 0)
toggle.Size = UDim2.fromOffset(145, 43)
toggle.Position = UDim2.new(1, -16, 0, 86)
toggle.Parent = gui
rounded(toggle, 12)

local panel = Instance.new("Frame")
panel.Name = "StatsPanel"
panel.AnchorPoint = Vector2.new(1, 0)
panel.Position = UDim2.new(1, -16, 0, 138)
panel.Size = UDim2.fromOffset(288, 181)
panel.BackgroundColor3 = SURFACE
panel.BorderSizePixel = 0
panel.Visible = false
panel.Parent = gui
rounded(panel, 16)

local stroke = Instance.new("UIStroke")
stroke.Color = BLUE
stroke.Thickness = 1.5
stroke.Transparency = 0.27
stroke.Parent = panel

local padding = Instance.new("UIPadding")
padding.PaddingLeft = UDim.new(0, 17)
padding.PaddingRight = UDim.new(0, 17)
padding.Parent = panel

label(panel, "KVN CLOTHING  /  ANALYTICS", UDim2.fromOffset(0, 12), UDim2.new(1, 0, 0, 26), 12, CYAN, true)
local dauValue = label(panel, "—", UDim2.fromOffset(0, 48), UDim2.new(0.5, -6, 0, 38), 25, WHITE, true)
local sessionValue = label(panel, "—", UDim2.new(0.5, 6, 0, 48), UDim2.new(0.5, -6, 0, 38), 25, WHITE, true)
label(panel, "DAILY ACTIVE USERS", UDim2.fromOffset(0, 83), UDim2.new(0.5, -6, 0, 26), 10, MUTED, false)
label(panel, "SESSION / MIN", UDim2.new(0.5, 6, 0, 83), UDim2.new(0.5, -6, 0, 26), 10, MUTED, false)
local note = label(panel, "Laden…", UDim2.fromOffset(0, 132), UDim2.new(1, 0, 0, 36), 10, MUTED, false)
note.TextWrapped = true
note.TextTruncate = Enum.TextTruncate.None

-- Responsive size: no full-screen overlay or interference with joystick/jump buttons.
local camera = workspace.CurrentCamera or workspace:GetPropertyChangedSignal("CurrentCamera"):Wait()
camera = workspace.CurrentCamera
local function resize()
	if not camera then return end
	local width = camera.ViewportSize.X
	local mobile = width < 640
	panel.Size = UDim2.fromOffset(math.max(210, math.min(288, width - 32)), 181)
	toggle.Position = UDim2.new(1, -16, 0, mobile and 60 or 86)
	panel.Position = UDim2.new(1, -16, 0, mobile and 112 or 138)
end
resize()
if camera then camera:GetPropertyChangedSignal("ViewportSize"):Connect(resize) end

local open = false
toggle.Activated:Connect(function()
	open = not open
	panel.Visible = open
	toggle.Text = open and "✕  CLOSE STATS" or "📊  GAME STATS"
	if open then
		panel.BackgroundTransparency = 0.2
		TweenService:Create(panel, TweenInfo.new(0.17, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			BackgroundTransparency = 0,
		}):Play()
	end
end)

local function number(n)
	if typeof(n) ~= "number" then return "—" end
	local text = tostring(math.floor(n + 0.5))
	local result = text:reverse():gsub("(%d%d%d)", "%1."):reverse()
	return result:sub(1, 1) == "." and result:sub(2) or result
end

local function session(n)
	if typeof(n) ~= "number" then return "—" end
	return string.format("%.1f", n):gsub("%.", ",")
end

local function update(snapshot)
	if typeof(snapshot) ~= "table" or snapshot.state ~= "ready" then
		dauValue.Text, sessionValue.Text = "—", "—"
		note.Text = "Roblox Analytics momenteel niet beschikbaar."
		return
	end
	dauValue.Text = number(snapshot.dau)
	sessionValue.Text = session(snapshot.sessionMinutes)
	if typeof(snapshot.dauDate) == "string" and snapshot.dauDate ~= "" then
		note.Text = "Laatste volledige dag: " .. snapshot.dauDate .. " (UTC)"
	else
		note.Text = "Geverifieerde gegevens via KVN CLOTHING"
	end
end

remote.OnClientEvent:Connect(update)
remote:FireServer("snapshot")
