export class MenuItem {

    constructor(public path: string | undefined,
        public title: string,
        public icon?: string | undefined,
        public children?: MenuItem[],
        public permissions?: any[] | null) {
    }

    public static get empty(): MenuItem {
        return new MenuItem('', '', '');
    }

    public static fromTitle(title: string): MenuItem {
        return new MenuItem('', title, '');
    }
}
