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

// 1. Xây dựng chức năng hiển thị (2 điểm)
// Hiển thị danh sách sản phẩm theo dạng table
const url = "http://localhost:3000/products";
const tbody = document.querySelector('tbody');
const content = document.querySelector('.content');
const btnAdd = document.querySelector('.btn-add');
fetch(url).then(res => res.json()).then(data => {
    const html = data.map(pro => {
        return /*html*/`
        <tr>
            <td>${pro.id}</td>
            <td>${pro.name}</td>
            <td>${pro.price}</td>
            <td>
            <button class="btn-update" data-id="${pro.id}">Sửa</button>
            |
            <button class="btn-delete" data-id="${pro.id}">Xóa</button>
            </td>
        </tr>
        `;
    }).join('');
    tbody.innerHTML = html;

    // 2. Xây dựng chức năng xóa (2 điểm)
    // Xóa sản phẩm: 1đ
    // Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
    const btnDelete = document.querySelectorAll('.btn-delete');
    for (const btn of btnDelete) {
        btn.addEventListener('click', function () {
            if (confirm('Bạn có muốn xóa')) {
                const id = btn.dataset.id;
                removePro(id);
            }
        })
    }

    /*
    4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
    Cập nhật sản phẩm: 1đ
    Hiển thị thông báo sau khi cập nhật: 0.5đ
    Validate form: 0.5đ
    */
    const btnUpdate = document.querySelectorAll('.btn-update');
    for (const btn of btnUpdate) {
        btn.addEventListener('click', function () {
            const id = btn.dataset.id;
            // alert(btn.dataset.id)
            fetch(`${url}/${id}`, {
                // method: 'DELETE',
            }).then(res => res.json()).then(data => {
                content.innerHTML = /*html*/`
                <form action="">
                    <input type="text" name="" id="name" placeholder="Nhập Tên" value="${data.name}">
                    <input type="text" name="" id="price" placeholder="Nhập giá"  value="${data.price}">
                    <input type="submit" value="Sửa" class="btn-sub">
                </form>
            `;
                const btnSub = document.querySelector('.btn-sub');
                const name = document.querySelector('#name');
                const price = document.querySelector('#price');
                btnSub.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (name.value == "") {
                        alert('Bạn chưa nhập tên');
                        name.focus();
                        return false;
                    } else if (price.value == "") {
                        alert('Bạn chưa nhập giá');
                        price.focus();
                        return false;
                    } else if (isNaN(Number(price.value)) || Number(price.value) <= 0) {
                        alert('Giá phải  lớn hơn 0');
                        price.focus();
                        return false;
                    }
                    const new_pro = {
                        id: id.value,
                        name: name.value,
                        price: price.value,
                    }
                    update(id, new_pro);
                })
            }).catch(error => console.log(error));

        })
    }


}).catch(error => console.log(error));

const removePro = function (id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
    }).then(res => res.json()).then(() => {
        alert('Xóa thành công');
    }).catch(error => console.log(error));
}

/*
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate  : 0.5đ
*/
btnAdd.addEventListener('click', function () {
    content.innerHTML = /*html*/`
    <form action="">
        <input type="text" name="" id="name" placeholder="Nhập Tên">
        <input type="text" name="" id="price" placeholder="Nhập giá">
        <input type="submit" value="Thêm" class="btn-sub">
    </form>
`;
    const btnSub = document.querySelector('.btn-sub');
    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    btnSub.addEventListener('click', function (e) {
        e.preventDefault();
        if (name.value == "") {
            alert('Bạn chưa nhập tên');
            name.focus();
            return false;
        } else if (price.value == "") {
            alert('Bạn chưa nhập giá');
            price.focus();
            return false;
        } else if (isNaN(Number(price.value)) || Number(price.value) <= 0) {
            alert('Giá phải  lớn hơn 0');
            price.focus();
            return false;
        }
        const new_pro = {
            name: name.value,
            price: price.value,
        }
        add(new_pro);
    })
});
const add = function (data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(() => {
        alert('Thêm thành công');
    }).catch(error => console.log(error));
}

const update = function (id, data) {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(() => {
        alert('Sửa thành công');
    }).catch(error => console.log(error));
}
