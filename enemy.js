class Entity
{
    constructor(posX, posY, velX, velY, h, w, type, hp)
    {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.h = h; //hitbox sizes
        this.w = w;
        this.type = type;
        this.hp = hp;
    }
}