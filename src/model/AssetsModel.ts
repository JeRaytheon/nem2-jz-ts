export class AssetsModel {
    name: string;
    amount: number;

    public static transformation(mosiacId: string): string {
        switch (mosiacId) {
            case '213DBF1EC34E0104':
                return "GAS"
            case '2AA5F09DE9FAABF4':
                return "JZJ"
        }
        return mosiacId;
    }
}
