export interface MtgCard {
    layout: string;
    name: string;
    manaCost: string;
    cmc: number;
    colors: string[];
    type: string;
    types: string[];
    subtypes: string[];
    text: string;
    power: string;
    toughness: string;
    imageName: string;
    printings: string[];
    colorIdentity: string[];
}

export interface CardContainer{
    Card: MtgCard
}


export class CardHelper{
    public static cardToString(card: MtgCard){
        return `**${card.name}** ${this.getManaCost(card)} \n **${card.type}** ${this.getText(card)} ${this.getPowerTough(card)} \n Colour Identity: ${card.colorIdentity}`;
    }

    private static getManaCost(card: MtgCard){
        if(card.manaCost){
            return `\n Cost: ${card.manaCost}`;
        }
        return '\n 0';
    }
    
    private static getText(card: MtgCard){
        if(card.text){
            return `\n ${card.text}`;
        }
        return '';
    }
    
    private static getPowerTough(card: MtgCard){
        if(card.power){
            return `\n **${card.power}/${card.toughness}**`;
        }
        return '';
    }
}