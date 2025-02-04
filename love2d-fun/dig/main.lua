require 'middleclass'
--

Diglett = Object:subclass('Diglett')

function Diglett:initialize(x, y)
	self.state = 1
	self.x = x +11
	self.y = y +13
end	

function Diglett:draw()
	love.graphics.draw(dig[self.state], self.x, self.y)
end

function Diglett:update()
	if love.mouse.isDown("l")  then
		self:hide()
	elseif love.mouse.isDown("r") then
		self:comeUp()
	else
		self:idle()
	end
end

function Diglett:hide()
	if (self.state == 1) or (self.state == 2) or (self.state == 6) then
		self.state = 3
		love.timer.sleep(0.1)
	elseif (self.state == 3) or (self.state == 5) then
		self.state = 4
		love.timer.sleep(0.1)
	end
end

function Diglett:comeUp()
	if self.state == 2 then
		self.state = 1
		love.timer.sleep(0.1)
	elseif (self.state == 3) or (self.state == 5) then
		self.state = 6
		love.timer.sleep(0.1)
	elseif self.state == 4 then
		self.state = 5
		love.timer.sleep(0.1)
	elseif self.state == 6 then
		self.state = 2
		love.timer.sleep(0.1)
	end
end

function Diglett:idle()
	if (self.state == 1) or (self.state == 2) then
		self:shift()
	elseif self.state == 4 then
		self.state = 5
		love.timer.sleep(0.3)
	end
end

function Diglett:shift()
	if self.state == 1 then
		self.state = 2
	elseif self.state == 2 then
		self.state = 1
	end
	love.timer.sleep(0.4)
end
--

digletts = {}
digly = Diglett(100 - 22/2, 0)
table.insert(digletts, digly)

function love.load()
	loadtime = love.timer.getTime()
	love.window.setMode(200, 50)
	love.graphics.setBackgroundColor(255, 255, 255)
	dig = {}
	for i = 1, 6 do
		dig[i] = love.graphics.newImage('diglett' .. i .. '.png')
	end
end

function love.update()
	for i,v in ipairs(digletts) do v:update() end
end

function love.draw()
	for i,v in ipairs(digletts) do v:draw() end
end
