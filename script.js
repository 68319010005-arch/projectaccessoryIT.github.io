// จำลองฐานข้อมูลอุปกรณ์ไอที (สามารถเพิ่มของลงไปในนี้ได้เยอะๆ เลยครับ)
const gadgets = [
    {
        id: 1,
        title: "Asus ROG Zephyrus G14",
        category: "pc",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500",
        desc: "โน้ตบุ๊กเกมมิ่งสายบางเบา แรงด้วย Ryzen 9 และ RTX 40-Series จอสวยสะใจ",
        price: "59,900.-",
        rating: 4.8
    },
    {
        id: 2,
        title: "Logitech G Pro X Superlight 2",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500",
        desc: "เมาส์เกมมิ่งไร้สายระดับโปรเพลเยอร์ น้ำหนักเบาพิเศษ เซนเซอร์แม่นยำที่สุด",
        price: "4,990.-",
        rating: 4.9
    },
    {
        id: 3,
        title: "Apple Watch Ultra 2",
        category: "gadget",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=500",
        desc: "สมาร์ตวอทช์สายลุย หน้าจอจอสว่างพิเศษ แบตเตอรี่อึด ฟังก์ชันดำน้ำและเดินป่าครบครัน",
        price: "31,900.-",
        rating: 4.7
    },
    {
        id: 4,
        title: "Custom Mechanical Keyboard 75%",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500",
        desc: "คีย์บอร์ดกลไกเสียงดีไซน์สวย เลือกสวิตช์และคีย์แคปได้ตามใจชอบ มิติเสียงนุ่มลึก",
        price: "3,500.-",
        rating: 4.6
    },
    {
        id: 5,
        title: "Sony WH-1000XM5",
        category: "gadget",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
        desc: "หูฟังครอบหูตัดเสียงรบกวนอันดับหนึ่ง เบสแน่น สวมใส่สบายตลอดทั้งวัน",
        price: "11,490.-",
        rating: 4.9
    },
    {
        id: 6,
        title: "iPad Pro M4 (2024)",
        category: "pc",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500",
        desc: "แท็บเล็ตที่ทรงพลังที่สุดด้วยชิป M4 หน้าจอ Tandem OLED บางเฉียบจนน่าทึ่ง",
        price: "39,900.-",
        rating: 4.8
    }
];

const gadgetGrid = document.getElementById('gadget-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// ฟังก์ชันสำหรับแสดงผลการ์ดสินค้า
function displayGadgets(items) {
    let displayData = items.map(function (item) {
        // กำหนดชื่อคลาสของ Tag ตามประเภท
        let tagClass = `tag-${item.category}`;
        let tagName = item.category === 'pc' ? 'PC & Laptop' : item.category === 'gaming' ? 'Gaming Gear' : 'Smart Gadget';

        return `<article class="card">
            <img src="${item.image}" alt="${item.title}" class="card-img">
            <div class="card-body">
                <span class="tag ${tagClass}">${tagName}</span>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.desc}</p>
                <div class="card-footer">
                    <span class="price">${item.price}</span>
                    <span class="rating"><i class="fas fa-star"></i> ${item.rating}</span>
                </div>
            </div>
        </article>`;
    });
    
    // นำข้อมูลไปใส่ใน HTML
    gadgetGrid.innerHTML = displayData.join("");
}

// เรียกใช้งานตอนเปิดหน้าเว็บครั้งแรก ให้โชว์ทั้งหมด
window.addEventListener('DOMContentLoaded', function() {
    displayGadgets(gadgets);
});

// ระบบ Filter คัดแยกประเภท
filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        // ลบคลาส active จากปุ่มเดิม แล้วใส่ให้ปุ่มที่กด
        filterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        const category = e.currentTarget.dataset.filter;
        
        // คัดกรองข้อมูลตามเงื่อนไข
        if(category === 'all') {
            displayGadgets(gadgets);
        } else {
            const filteredItems = gadgets.filter(function(item) {
                return item.category === category;
            });
            displayGadgets(filteredItems);
        }
    });
});
