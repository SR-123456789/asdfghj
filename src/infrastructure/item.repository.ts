export interface Item {
    id: number;
    name: string;
    date: Date;
    cost: number;
    retail: number;
}

export class ItemRepository {
    private items: Item[] = [];
    private currentId: number = 1;

    /**
     * 商品を登録し、登録された商品情報を返す。
     * @param date 登録日（または対象日）
     * @param name 登録する商品の名前
     * @param date 登録日
     * @param cost 原価
     * @param retail 販売価格
     * @returns 登録された Item オブジェクト
     */
    registerItem(date: Date, name: string, cost: number, retail: number): Item {
        const newItem: Item = {
            id: this.currentId++,
            date,
            name,
            cost,
            retail,
        };
        this.items.push(newItem);
        return newItem;
    }

    findItemByName(name: string): Item|undefined {
        return this.items.find(item => item.name === name);
    }
    

    /**
     * 登録されている全商品を取得する。
     * @returns Item の配列
     */
    getAllItems(): Item[] {
        return this.items;
    }

    /**
     * 指定したIDの商品が存在するかを判定する。
     * @param id 商品ID
     * @returns 存在する場合は true、存在しない場合は false
     */
    hasItemById(id: number): boolean {
        return this.items.some(item => item.id === id);
    }

    getItemById(id: number): Item|undefined {
        const item = this.items.find(item => item.id === id);
        if (item === undefined) {
            console.log("hasItemByIdで存在チェックしてください")
            return undefined;
        }
        return this.items.find(item => item.id === id);
    }
}
