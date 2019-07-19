class Projectile
{
    constructor(posX, posY, velX, velY, w, h, type, friendly)
    {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.w = w;
        this.h = h; //hitbox sizes
        this.type = type;
        this.friendly = friendly; //bool, if false, then damages player
        this.alive = true;
    }
}