
const url = "http://localhost:3000/products";
const tbody = document.querySelector('tbody');
const content = document.querySelector('.content');
fetch(`${url}`).then(res => res.json()).then(data => {
    tbody.innerHTML = data.map(pro => {
        return /*html*/ `
        <tr>
            <td>${pro.id}</td>
            <td>${pro.name}</td>
            <td>${pro.price}</td>
            <td>
                <button data-id = "${pro.id}" class="btn-edit btn btn-warning ">Sửa</button>
                <button data-id = "${pro.id}"  class="btn-del btn btn-danger  ">Xóa</button>
            </td>
        </tr>
        `;
    }).join('');

    const btnDel = document.querySelectorAll('.btn-del');
    for (const btn of btnDel) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            confirm('bạn có muốn xóa không ?') ? remove(id) : "";

        });
    }
    const btnEdit = document.querySelectorAll('.btn-edit');
    for (const btn of btnEdit) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            fetch(`${url}/${id}`).then(res => res.json()).then(data => {
                btn.addEventListener('click', () => {
                    content.innerHTML = /*html*/ `
                        <form action="">
                            <input type="text" value="${data.name}" class="pro-name form-control mb-3 " placeholder="Nhập tên">
                            <input type="text" value="${data.price}" class="pro-price form-control mb-3 " placeholder="Nhập price">
                            <button type="submit" class="btn-sub btn btn-primary mb-3 ">Thêm</button>
                        </form>
                        `;
                    const btnSub = document.querySelector('.btn-sub')
                    btnSub.addEventListener('click', (e) => {
                        e.preventDefault();
                        const name = document.querySelector('.pro-name')
                        const price = document.querySelector('.pro-price')
                        if (name.value == "") {
                            alert('Không bỏ trống name');
                            return false;
                        }
                        if (price.value == "") {
                            alert('Không bỏ trống price');
                            return false;
                        }
                        const data = {
                            id: id,
                            name: name.value,
                            price: price.value,
                        }
                        fetch(`${url}/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }).then(res => res.json()).then(
                            alert('Update thành công')
                        ).catch(err => console.log(err));
                    })
                })
            }).catch(err => console.log(err));
        });
    }

}).catch(err => console.log(err));

const remove = (id) => {
    fetch(`${url}/${id}`, {
        method: "DELETE"
    }).then(res => res.json()).then(
        alert('Xóa thành công')
    ).catch(err => console.log(err));
}

const btnAdd = document.querySelector('.btn-add');
btnAdd.addEventListener('click', () => {
    content.innerHTML = /*html*/ `
        <form action="">
            <input type="text" class="pro-name form-control mb-3 " placeholder="Nhập tên">
            <input type="text" class="pro-price form-control mb-3 " placeholder="Nhập price">
            <button type="submit" class="btn-sub btn btn-primary mb-3 ">Thêm</button>
        </form>
        `;
    const btnSub = document.querySelector('.btn-sub')
    btnSub.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.querySelector('.pro-name')
        const price = document.querySelector('.pro-price')
        if (name.value == "") {
            alert('Không bỏ trống name');
            return false;
        }
        if (price.value == "") {
            alert('Không bỏ trống price');
            return false;
        }
        const data = {
            name: name.value,
            price: price.value,
        }
        fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(
            alert('Thêm thành công')
        ).catch(err => console.log(err));
    })
})