class Product {
    constructor() {
        this.id = 1;
        this.arrayProduct = [];
        this.editID = null;
    }

    save() {
        let product = this.len_data();

        if (this.valid_values(product)) {
            if(this.editID == null) {
                this.add(product);
            } else {
                this.update(this.editID, product);
            }
        }

        this.list_tab();
        this.clear();
    }

    clear() {
        document.getElementById('nome').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('BTN_01').innerText = 'ADICIONAR';
        this.editID = null;
    }

    list_tab() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProduct.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_product = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_actions = tr.insertCell();

            td_id.innerText = this.arrayProduct[i].id;
            td_product.innerText = this.arrayProduct[i].nome;
            td_quantidade.innerText = this.arrayProduct[i].quantidade;

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute('onclick', 'product.edit('+ JSON.stringify(this.arrayProduct[i]) +')')
            td_actions.appendChild(imgEdit);

            let imgDelet = document.createElement('img');
            imgDelet.src = 'img/delet.png';
            imgDelet.setAttribute('onclick', 'product.delete('+this.arrayProduct[i].id+')')
            td_actions.appendChild(imgDelet);

        }
    }

    add(product) {
        this.arrayProduct.push(product);
        this.id++;
    }

    len_data() {
        let product = {};
        product.id = this.id;
        product.nome = document.getElementById('nome').value;
        product.quantidade = document.getElementById('quantidade').value;

        return product;
    }

    valid_values(product) {
        let msg = '';

        if (product.nome === '') {
            msg += '- Informe o nome\n';
        }

        if (product.quantidade === '') {
            msg += '- Informe a quantidade\n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
    }

    delete(id) {

        let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProduct.length; i++) {
            if(this.arrayProduct[i].id == id) {
                this.arrayProduct.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }

    edit(dados) {
        this.editID = dados.id;

        document.getElementById('nome').value = dados.nome;
        document.getElementById('quantidade').value = dados.quantidade;

        document.getElementById('BTN_01').innerText = 'ATUALIZAR';
    }

    update(id, product) {
        for(let i = 0; i < this.arrayProduct.length; i++) {
            if(this.arrayProduct[i].id == id) {
                this.arrayProduct[i].nome = product.nome;
                this.arrayProduct[i].quantidade = product.quantidade;
            }
        }
    }
}

var product = new Product();
