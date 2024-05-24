import api from './api';


export default class RefBooks {
    constructor() {
        var index = 0;
        this.refBooks =[
            'field-activities',
            'posts',
            'responsibilities',
            'treasures',
            'commission-types',
            'foundation-documents',
            'storages',
            'inn-types',
            'org-names',
            'org-types',
            'security-intruders',
            'security-threats',
        ]
        for (index = 0; index < this.refBooks.length; index++) {
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
        return api.get('/ref_books/' + refbook_name);
    };
}