/**
1. Xây dựng chức năng hiển thị (2 điểm)
Hiển thị danh sách sản phẩm theo dạng table
2. Xây dựng chức năng xóa (2 điểm)
Xóa sản phẩm: 1đ
Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate form: 0.5đ
4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
Cập nhật sản phẩm: 1đ
Hiển thị thông báo sau khi cập nhật: 0.5đ
Validate form: 0.5đ
5. Xây dựng chức năng đăng nhập (1 điểm) 
Đăng nhập thành công : 0.5đ
Thông báo sau khi đăng nhập thành công: 0.5đ
6. Xây dựng giao diện sử dụng bootstrap hoặc tailwindcss (1 điểm)
*/

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
                <button data-id="${pro.id}" class="btn-edit btn btn-warning ">Sửa</button>
                <button data-id="${pro.id}" class="btn-del btn btn-danger">Xóa</button>
            </td>
        </tr>
        `;
    }).join('');

    const btnDel = document.querySelectorAll('.btn-del');
    for (const btn of btnDel) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            confirm('Bạn có muốn xóa không ?') ? remove(id) : "";
        })
    }
    const btnEdit = document.querySelectorAll('.btn-edit');
    for (const btn of btnEdit) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            fetch(`${url}/${id}`).then(res => res.json()).then(data => {
                btn.addEventListener('click', () => {
                    content.innerHTML = /*html*/ `
                    <h2>Sửa sản phẩm</h2>
                    <form action="">
                            <input type="text" name="" id="" placeholder="Nhập tên" class="pro-name form-control  mb-2" value= "${data.name}">
                            <input type="text" name="" id="" placeholder="Nhập giá" class="pro-price form-control  mb-2" value = "${data.price}">
                            <button type="submit" class="btn-sub btn btn-primary  mb-2  ">Update</button>
                    </form>
            `
                    const btnSub = document.querySelector('.btn-sub');
                    btnSub.addEventListener('click', (e) => {
                        e.preventDefault();
                        const name = document.querySelector('.pro-name')
                        const price = document.querySelector('.pro-price')
                        if (name.value == "") {
                            alert('không bỏ trống name');
                            name.focus();
                            return false;
                        }
                        if ((price.value) == "") {
                            alert('không bỏ trống price');
                            price.focus();
                            return false;
                        } else if (isNaN(Number(price.value)) || Number(price.value) <= 0) {
                            alert('Price lớn hơn 0');
                            price.focus();
                            return false;
                        }
                        // b5
                        const data = {
                            id: id.value,
                            name: name.value,
                            price: price.value,
                        }
                        fetch(`${url}/${id}`, {
                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        }).then(res => res.json()).then(
                            alert('Update thành công')
                        ).catch(err => console.log(err));
                    
                    })
                })

            }).catch(err => console.log(err));

        })
    }
}).catch(err => console.log(err))
// hàm xóa
const remove = (id) => {
    fetch(`${url}/${id}`, {
        method: "DELETE",
    }).then(res => res.json()).then(
        alert('Xóa thành công')
    ).catch(err => console.log(err));
}

// add sản phẩm
const btnAdd = document.querySelector('.btn-add');
btnAdd.addEventListener('click', () => {
    content.innerHTML = /*html*/ `
    <form action="">
        <input type="text" name="" id="" placeholder="Nhập tên" class="pro-name form-control mb-2 ">
        <input type="text" name="" id="" placeholder="Nhập tên" class="pro-price form-control mb-3 ">
        <button type="submit" class="btn-sub btn btn-primary mb-3">Thêm</button>
    </form>
    `;

    const btnSub = document.querySelector('.btn-sub');
    btnSub.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.querySelector('.pro-name');
        const price = document.querySelector('.pro-price');
        if (name.value == "") {
            alert('không bỏ trống name');
            name.focus();
            return false;
        }
        if (price.value == "") {
            alert('không bỏ trống price');
            price.focus();
            return false;
        }
        const data = {
            name: name.value,
            price: price.value,
        }
        add(data);

    })
})
const add = (data) => {
    fetch(`${url}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(
        alert('Thêm thành công')
    ).catch(err => console.log(err));
}

