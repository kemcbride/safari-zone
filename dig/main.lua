function love.load()
	stime = love.timer.getTime()
	love.graphics.setMode(100, 100)
	love.graphics.setBackgroundColor(255, 255, 255)
	diglett1 = love.graphics.newImage('diglett1.png')
	diglett2 = love.graphics.newImage('diglett2.png')
	diglett3 = love.graphics.newImage('diglett3.png')
	diglett4 = love.graphics.newImage('diglett4.png')
	diglett5 = love.graphics.newImage('diglett6.png')
	diglett6 = love.graphics.newImage('diglett5.png')
	love.graphics.draw(diglett1, 50, 50)
end
	
function love.draw()
	time = love.timer.getTime() - stime
	frameCount = (time*3)%10
	if frameCount > 3 and frameCount < 4 then
		love.graphics.draw(diglett2, 50, 50)
	elseif frameCount > 4 and frameCount < 5 then
		love.graphics.draw(diglett3, 50, 50)
	elseif frameCount > 5 and frameCount < 6 then
		love.graphics.draw(diglett4, 50, 50)
	elseif frameCount > 6 and frameCount < 7 then
		love.graphics.draw(diglett5, 50, 50)
	elseif frameCount > 7 and frameCount < 8 then
		love.graphics.draw(diglett6, 50, 50)
	elseif frameCount > 9 and frameCount < 10 then
		love.graphics.draw(diglett2, 50, 50)
	else
		love.graphics.draw(diglett1, 50, 50)
	end
end
