{
    // Retain a reference to the original function
    const Game_Actor_setup = Game_Actor.prototype.setup;

    Game_Actor.prototype.setup = function (actorId) {
        // Call the original function
        Game_Actor_setup.call(this, actorId);
        this.race = $dataActors[actorId].meta.race || null;
    };

    Game_Actor.prototype.changeRace = function (newRace) {
        this.race = newRace;
    };

    Window_Status.prototype.drawActorNickname = function (actor, x, y, width = 270) {
        this.resetTextColor();
        if (actor.race) {
            this.drawText(actor.race, x, y, width);
        } else {
            this.drawText(actor.nickname(), x, y, width);
        }
    };

    // Retain a reference to the original function
    const Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        // Call the original function
        Game_Interpreter_pluginCommand.call(this, command, args);
        // If the plugin command is ours
        if (command.toLowerCase() === "changerace") {
            // Grab the arguments
            const id = parseInt(args[0]);
            const newRace = args[1];
            // Change the actor's race
            $gameActors.actor(id).changeRace(newRace);
        }
    };
}