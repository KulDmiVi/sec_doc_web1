import api from './api';


export default class RefBooksKii {
    constructor() {
        var index = 0;
        this.refBooks =[
            'architectures',
            'electro-categories',
            'electro-purposes',
            'electro-ways',
            'electro-protocols',
            'types',
            'software-applications',
            'software-os',
            'software-protection',
            'incident-types',
            'technical-measures',
            'organizational-measures',
            'incident-damages',
            'security-threats',
            'violator-categories'
        ]
        for (index = 0; index < this.refBooks.length; index++) {
            console.log(this.refBooks[index]);
            let refName = this.refBooks[index]
            this.getRefBook(refName).then(
                (response) => {
                    localStorage.setItem(refName, JSON.stringify(response.data));
                },
                (error) => { console.log(error)}

            )

        }
    }
    getRefBook(refbook_name) {
        return api.get('/ref_books/kii/' + refbook_name);
    };
}