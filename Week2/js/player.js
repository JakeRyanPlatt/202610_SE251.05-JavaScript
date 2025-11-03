class Player {
    constructor(name = "Player") {
        this.name = name;
        this.score = 0;
        this.highScore = 0;
        // pad will be a Box instance representing the player's paddle
        // Create a default Box so the Player always has a pad available
        this.pad = new Box();
    }
}
