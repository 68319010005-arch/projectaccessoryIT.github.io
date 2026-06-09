// ฐานข้อมูลสินค้าไอทีพร้อมราคาจริง (ตัวเลข) เพื่อนำไปคำนวณราคารวมได้
const gadgets = [
    {
        id: 1,
        title: "Asus ROG Zephyrus G14",
        category: "pc",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
        desc: "โน้ตบุ๊กเกมมิ่งระดับท็อป ขุมพลัง Ryzen 9 และ RTX 40-Series หน้าจอ ROG Nebula จอสวย สเปกแรงจัดเต็มในบอดี้ที่บางเบาพกพาง่าย",
        price: 59900,
        rating: 4.8
    },
    {
        id: 2,
        title: "Logitech G Pro X Superlight 2",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500",
        desc: "เมาส์ไร้สายยอดฮิตของโปรเพลเยอร์ น้ำหนักเบาสุดขีด อัปเกรดสวิตช์แบบ Hybrid แบตอึดยาวนาน แม่นยำทุกการสะบัดเมาส์",
        price: 4990,
        rating: 4.9
    },
    {
        id: 3,
        title: "Apple Watch Ultra 2",
        category: "gadget",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=500",
        desc: "สมาร์ตวอทช์ระดับพรีเมียมสำหรับสายลุย บอดี้ไทเทเนียม หน้าจอสว่างสู้แดด พร้อมฟีเจอร์ติดตามการออกกำลังกายและกู้ภัยระดับสูง",
        price: 31900,
        rating: 4.7
    },
    {
        id: 4,
        title: "Custom Mechanical Keyboard 75%",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500",
        desc: "คีย์บอร์ดโครงสร้างคัสตอม รองรับระบบ Hot-swappable ซับเสียงหนาแน่นภายใน ให้โทนเสียงเพราะนุ่มนวล พิมพ์สนุกไม่ซ้ำใคร",
        price: 3500,
        rating: 4.6
    },
    {
        id: 5,
        title: "Sony WH-1000XM5",
        category: "gadget",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
        desc: "ที่สุดของหูฟังไร้สายแบบครอบหู พร้อมเทคโนโลยีตัดเสียงรบกวนอัจฉริยะ (ANC) ไมโครโฟนชัดเจน และไดรเวอร์เสียงความละเอียดสูง",
        price: 11490,
        rating: 4.9
    },
    {
        id: 6,
        title: "iPad Pro M4 (2024)",
        category: "pc",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500",
        desc: "แท็บเล็ตระดับโปร ดีไซน์บางที่สุดเท่าที่เคยมีมา ขับเคลื่อนด้วยชิปเซ็ตเจนใหม่ Apple M4 จอภาพแบบ Ultra Retina XDR แสดงผลคมชัด",
        price: 39900,
        rating: 4.8
    }
];

// เก็บสถานะของสินค้าในรถเข็น
let cart = [];

// ดึงองค์ประกอบองค์ประกอบ DOM
const gadgetGrid = document.getElementById('gadget-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalDetailContent = document.getElementById('modal-detail-content');

// 1. ฟังก์ชันแสดงรายการสินค้าที่หน้าเว็บ
function displayGadgets(items) {
    gadgetGrid.innerHTML = items.map(item => {
        let tagClass = `tag-${item.category}`;
        let tagName = item.category === 'pc' ? 'PC & Laptop' : item.category === 'gaming' ? 'Gaming Gear' : 'Smart Gadget';
        return `
            <article class="card" onclick="openProductModal(${item.id})">
                <img src="${item.image}" alt="${item.title}" class="card-img">
                <div class="card-body">
                    <span class="tag ${tagClass}">${tagName}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.desc.substring(0, 60)}...</p>
                    <div class="card-footer">
                        <span class="price">${item.price.toLocaleString()} ฿</span>
                        <span class="rating"><i class="fas fa-star"></i> ${item.rating}</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

// 2. ระบบ Filter คัดแยกหมวดหมู่สินค้า
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const category = e.currentTarget.dataset.filter;
        if(category === 'all') {
            displayGadgets(gadgets);
        } else {
            displayGadgets(gadgets.filter(item => item.category === category));
        }
    });
});

// 3. ระบบแสดงป็อปอัพรายละเอียดสินค้า (Modal)
function openProductModal(id) {
    const product = gadgets.find(item => item.id === id);
    modalDetailContent.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="modal-img">
        <div class="modal-info">
            <div>
                <h2>${product.title}</h2>
                <h3 class="price" style="font-size: 1.5rem; margin-top:0.5rem;">${product.price.toLocaleString()} บาท</h3>
                <p class="modal-desc">${product.desc}</p>
            </div>
            <button class="modal-buy-btn" onclick="addToCart(${product.id}); closeProductModal();">
                <i class="fas fa-cart-plus"></i> ใส่ตะกร้ารถเข็น
            </button>
        </div>
    `;
    productModal.style.display = 'flex';
    setTimeout(() => productModal.classList.add('open'), 10);
}

function closeProductModal() {
    productModal.classList.remove('open');
    setTimeout(() => productModal.style.display = 'none', 300);
}

modalClose.addEventListener('click', closeProductModal);

// 4. ระบบการทำงานของรถเข็น (Shopping Cart)
cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
cartClose.addEventListener('click', () => cartSidebar.classList.remove('open'));

function addToCart(id) {
    const targetProduct = gadgets.find(item => item.id === id);
    const existProduct = cart.find(item => item.id === id);

    if (existProduct) {
        existProduct.qty += 1;
    } else {
        cart.push({ ...targetProduct, qty: 1 });
    }
    updateCartUI();
    cartSidebar.classList.add('open'); // แบรถเข็นออกมาให้ผู้ใช้เห็นว่าสินค้าเพิ่มเข้าแล้ว
}

function updateCartUI() {
    // อัปเดตตัวเลขจำนวนบนไอคอนรถเข็น
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.innerText = totalQty;

    // อัปเดตรายการสินค้าในหน้าต่างรถเข็น
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:2rem;">รถเข็นยังว่างเปล่า</p>`;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${(item.price * item.qty).toLocaleString()} ฿</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="changeQty(${item.id}, 'decrease')">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 'increase')">+</button>
                    </div>
                </div>
                <i class="fas fa-trash-alt remove-item" onclick="removeProduct(${item.id})"></i>
            </div>
        `).join("");
    }

    // คำนวณเงินรวม
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotalPrice.innerText = `${totalPrice.toLocaleString()} บาท`;
}

// ฟังก์ชันเพิ่ม-ลดจำนวนสินค้าในรถเข็น
function changeQty(id, action) {
    const item = cart.find(product => product.id === id);
    if (action === 'increase') {
        item.qty += 1;
    } else if (action === 'decrease') {
        item.qty -= 1;
        if (item.qty === 0) {
            return removeProduct(id);
        }
    }
    updateCartUI();
}

// ลบสินค้าออกจากตะกร้า
function removeProduct(id) {
    cart = cart.filter(product => product.id !== id);
    updateCartUI();
}

// 5. ปุ่มกดสั่งซื้อสินค้า (Checkout)
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("กรุณาเลือกสินค้าใส่รถเข็นก่อนส่งคำสั่งซื้อค่ะ");
    } else {
        alert("🎉 ส่งคำสั่งซื้อสำเร็จ! ขอบคุณที่ร่วมทดสอบระบบตะกร้าสินค้าของ IT HUB ครับ");
        cart = []; // เคลียร์รถเข็นหลังจากกดสั่งซื้อ
        updateCartUI();
        cartSidebar.classList.remove('open');
    }
});

// เริ่มต้นโหลดสินค้าเข้าหน้าเว็บ
window.addEventListener('DOMContentLoaded', () => {
    displayGadgets(gadgets);
    updateCartUI();
});
