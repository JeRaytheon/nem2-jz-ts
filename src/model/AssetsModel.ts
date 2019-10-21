export class AssetsModel {
    name: string;
    amount: number;

    public static transformation(mosiacId: string): string {
        switch (mosiacId) {
            case '2780D36E44C512C6':
                return "GAS"
        }
        return mosiacId;
    }
}
