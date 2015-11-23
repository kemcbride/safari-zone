require 'middleclass'

Bullet = Object:subclass('Bullet')
bullets = {}

local img = love.graphics.newImage'bullet.png'

function normalize(x,y)
	local l = (x*x+y*y)^.5
	return x/l,y/l
end

function Bullet:initialize()
	self.x = love.graphics.getWidth()/2
	self.y = love.graphics.getHeight()/2
	
	
	local mx,my = love.mouse.getPosition()
	self.vx ,self.vy = normalize(mx-self.x,my-self.y)
	self.r = math.atan2(self.vy,self.vx)
	self.vx,self.vy = self.vx*20,self.vy*20

end

function Bullet:draw()
	love.graphics.draw(img, self.x, self.y, self.r,2,.5, 24, 24)
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
	for i,v in ipairs(bullets) do 
		v:update()
		if v.x < 0 or v.y < 0 or v.x > love.graphics.getWidth() or v.y > love.graphics.getHeight() then
			table.remove(bullets,i)
		end
	end
end

function love.draw()
	for i,v in ipairs(bullets) do v:draw() end
	love.graphics.print(string.format("%d bullets left in the array",#bullets),110,110)
end
