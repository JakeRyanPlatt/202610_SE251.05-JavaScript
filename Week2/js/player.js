  // pad will be a Box instance representing the player's paddle
  // Create a default Box so the Player always has a pad available
class Player {
    constructor(name = "", pad = null) {
        this.name = name;
        this.score = 0;
        this.highScore = 0;
        this.pad = pad;
    }
}
