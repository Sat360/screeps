Creep.prototype.findConstructionSite = function()
{
	var target = this.pos.findClosest(FIND_CONSTRUCTION_SITES);
	this.memory.target = target.id;
}

var totalHarvesters = 0;
var totalBuilders = 0;
var neededBuilers = 1;

var harvester = require('harvester');
var builder = require('builder');
var setRoadPoint = require('SetRoadPoint');

for (var i in Game.creeps)
{
//    var creep = Game.creeps[i];
    if (Game.creeps[i].memory.role == 'harvester')
    {
        totalHarvesters++;
        harvester(Game.creeps[i]);
        setRoadPoint(Game.creeps[i]);
    }
    
	if (Game.creeps[i].memory.role == 'builder') 
	{
	    totalBuilders++;
		builder(Game.creeps[i]);
	}
}

for (var i in Memory.roads)
{
    if (Memory.roads[i] > 3)
    {
	Game.rooms[Memory.roadsid[i].roomName].createConstructionSite(Memory.roadsid[i].x, Memory.roadsid[i].y, STRUCTURE_ROAD);
        delete Memory.roads[i];
    }
}

while(totalHarvesters < 4) 
{
	Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], '' , { role: 'harvester'});
	totalHarvesters++;
}

var construction = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES, {filter: {my : true}});

if (totalBuilders != 0 && construction.length / totalBuilders >= 10)
{
    neededBuilers = Math.floor(construction.length / 10);
}

if (totalBuilders < neededBuilers && construction.length > 0)
{
	Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], '', { role: 'builder'});
}
