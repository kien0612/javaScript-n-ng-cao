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
            <button data-id="${pro.id}" class="btn-del btn btn-danger  ">Xóa</button>
        </td>
    </tr>
        `;
    }).join('');

    const btnDel = document.querySelectorAll('.btn-del');
    for (const btn of btnDel) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            confirm("Bạn có muốn xóa?") ? remove(id) : ""
        })
    }
 
    const btnEdit = document.querySelectorAll('.btn-edit');
    for (const btn of btnEdit) {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            fetch(`${url}/${id}`).then(res => res.json()).then(data =>{
                content.innerHTML = /*html*/ `
                <form action="">
                    <input type="text" value="${data.name}" class="pro-name form-control mb-3 " placeholder="Nhập name">
                    <input type="text" value="${data.price}" class="pro-price form-control mb-3 " placeholder="Nhập price">
                    <button class="btn-sub btn btn-primary mb-3 ">Update</button>
                </form>
                `;
                const btnSub = document.querySelector('.btn-sub')
                btnSub.addEventListener('click', (e) => {
                    const name = document.querySelector('.pro-name')
                    const price = document.querySelector('.pro-price')
                    if (name.value == "") {
                        e.preventDefault();
                        alert("không bỏ trống name")
                        return false
                    }
                    if (price.value == "") {
                        e.preventDefault();
                        alert("không bỏ trống price")
                        return false
                    }
                    data = {
                        id:id,
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
                    ).catch(err => console.log(err))
                })
            }).catch(err => console.log(err))
        })
    }


}).catch(err => console.log(err))

const remove = (id) => {
    fetch(`${url}/${id}`, {
        method: "DELETE"
    }).then(res => res.json()).then(
        alert('Xóa thành công')
    ).catch(err => console.log(err))
}

const btnAdd = document.querySelector('.btn-add')
btnAdd.addEventListener('click', () => {
    fetch(`${url}`).then(res => res.json()).then(data => {
        content.innerHTML = /*html*/ `
        <form action="">
            <input type="text" class="pro-name form-control mb-3 " placeholder="Nhập name">
            <input type="text" class="pro-price form-control mb-3 " placeholder="Nhập price">
            <button class="btn-sub btn btn-primary mb-3 ">Thêm</button>
        </form>
        `;
        const btnSub = document.querySelector('.btn-sub')
        btnSub.addEventListener('click', (e) => {
            const name = document.querySelector('.pro-name')
            const price = document.querySelector('.pro-price')
            if (name.value == "") {
                e.preventDefault();
                alert("không bỏ trống name")
                return false
            }
            if (price.value == "") {
                e.preventDefault();
                alert("không bỏ trống price")
                return false
            }
            data = {
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
            ).catch(err => console.log(err))
        })
    }).catch(err => console.log(err))
})