require 'middleclass'

Bullet = Object:subclass('Bullet')
bullets = {}

function Bullet:initialize()
	self.x = love.graphics.getWidth()/2
	self.y = love.graphics.getHeight()/2
	
	mouseX = love.mouse.getX()
	mouseY = love.mouse.getY()

	vecX = mouseX - self.x
	vecY = mouseY - self.y
	magnitude = math.sqrt(vecX*vecX + vecY*vecY)
	
	self.vx = vecX/magnitude
	self.vy = vecY/magnitude
end

function Bullet:draw()
	love.graphics.circle("fill", self.x, self.y, 5)
end

function Bullet:update()
	self.x = self.x + self.vx
	self.y = self.y + self.vy
end	

-- what i wanna do, actually... is make a function that creates a bullet on each mouse click
-- and deletes it once it escapes the bounds of the window...
-- and then bullet's stuff should take care of it... hmm or would it..??

function love.mousepressed (x, y, button)
	a = Bullet()
	table.insert(bullets, a)
end

function love.update()
	for i,v in ipairs(bullets) do v:update() end
end

function love.draw()
	for i,v in ipairs(bullets) do v:draw() end
end
