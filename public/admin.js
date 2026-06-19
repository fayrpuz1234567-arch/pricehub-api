// ─── API URL ──────────────────────────────────────────────
const API_URL = 'https://pricehub-api-production.up.railway.app';

// ─── State ──────────────────────────────────────────────────
let products = [];
let isEditing = false;
let isLoadingProducts = false;

// ─── DOM Elements ──────────────────────────────────────────
const form = document.getElementById('productForm');
const editId = document.getElementById('editId');
const name = document.getElementById('name');
const price = document.getElementById('price');
const oldPrice = document.getElementById('oldPrice');
const discount = document.getElementById('discount');
const category = document.getElementById('category');
const storeName = document.getElementById('storeName');
const stock = document.getElementById('stock');
const image = document.getElementById('image');
const description = document.getElementById('description');
const whatsapp = document.getElementById('whatsapp');
const facebook = document.getElementById('facebook');
const contactEmail = document.getElementById('contactEmail');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');
const searchInput = document.getElementById('searchInput');

// ─── Toast ──────────────────────────────────────────────────
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ─── Load Products ─────────────────────────────────────────
async function loadProducts() {
    // ✅ منع التحميل المتكرر
    if (isLoadingProducts) return;
    isLoadingProducts = true;

    try {
        // ✅ منع الـ Cache عشان يجيب أحدث البيانات
        const res = await fetch(`${API_URL}/products`, {
            cache: 'no-cache',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        const data = await res.json();
        products = data.data || [];
        
        // ✅ تحديث الإحصائيات والجدول
        renderStats(data.total);
        renderTable(products);
        
        document.getElementById('apiStatus').textContent = '🟢 API متصل';
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productsTable').innerHTML =
            `<div class="empty">❌ فشل تحميل المنتجات: ${error.message}</div>`;
        document.getElementById('apiStatus').textContent = '🔴 API غير متصل';
    } finally {
        isLoadingProducts = false;
    }
}

// ─── Stats ──────────────────────────────────────────────────
function renderStats(totalFromApi) {
    const total = totalFromApi ?? products.length;
    const inStock = products.filter(p => p.stock > 0).length;
    const outOfStock = products.filter(p => p.stock <= 0).length;
    const offers = products.filter(p => p.discountPercentage && p.discountPercentage > 0).length;

    document.getElementById('totalProducts').textContent = total;
    document.getElementById('inStockCount').textContent = inStock;
    document.getElementById('outOfStockCount').textContent = outOfStock;
    document.getElementById('offerCount').textContent = offers;
    document.getElementById('productCount').textContent = `${total} منتج`;
}

// ─── Render Table (محسّن بدون اهتزاز) ─────────────────────
function renderTable(data) {
    const container = document.getElementById('productsTable');

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="empty">📭 لا توجد منتجات</div>`;
        return;
    }

    // ✅ استخدم DocumentFragment عشان التحديث يكون سلس
    const fragment = document.createDocumentFragment();
    const table = document.createElement('table');
    
    // ─── Header ──────────────────────────────────────────────
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>الصورة</th>
            <th>المنتج</th>
            <th>المتجر</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>الكمية</th>
            <th>الإجراءات</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // ─── Body ────────────────────────────────────────────────
    const tbody = document.createElement('tbody');
    
    data.forEach(p => {
        const isInStock = p.stock > 0;
        const discountText = p.discountPercentage ? `${p.discountPercentage}%` : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image || 'https://via.placeholder.com/40'}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/40'"></td>
            <td class="product-name">${p.name}</td>
            <td>${p.storeName || '-'}</td>
            <td>${p.price} EGP</td>
            <td>${discountText}</td>
            <td>
                <span class="status-badge ${isInStock ? 'in-stock' : 'out-of-stock'}">
                    ${isInStock ? `✅ ${p.stock}` : '❌ غير متوفر'}
                </span>
            </td>
            <td>
                <div class="actions">
                    <button class="btn btn-primary btn-sm" onclick="editProduct(${p.id})">✏️ تعديل</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">🗑️ حذف</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    fragment.appendChild(table);
    
    // ✅ استبدال المحتوى مرة واحدة فقط
    container.innerHTML = '';
    container.appendChild(fragment);
}

// ─── Search ─────────────────────────────────────────────────
function searchProducts() {
    const query = searchInput.value.toLowerCase();
    if (!query.trim()) {
        renderTable(products);
        return;
    }
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.storeName && p.storeName.toLowerCase().includes(query))
    );
    renderTable(filtered);
}

// ─── Add / Edit Product ────────────────────────────────────
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productData = {
        name: name.value.trim(),
        price: parseFloat(price.value),
        oldPrice: oldPrice.value ? parseFloat(oldPrice.value) : null,
        discountPercentage: discount.value ? parseFloat(discount.value) : 0,
        category: category.value,
        storeName: storeName.value.trim(),
        stock: parseInt(stock.value),
        image: image.value.trim(),
        description: description.value.trim(),
        whatsapp_number: whatsapp.value.trim() || null,
        facebook_page: facebook.value.trim() || null,
        contact_email: contactEmail.value.trim() || null,
        rating: 0,
        reviewCount: 0,
        isTrending: false,
        isBestSeller: false,
        isOffer: false,
        currency: 'EGP',
        subCategory: ''
    };

    try {
        let res;

        if (isEditing) {
            const id = parseInt(editId.value);
            res = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                showToast('✅ تم تحديث المنتج بنجاح!', 'success');
                resetForm();
                await loadProducts(); // ✅ Force reload مع await
            } else {
                const err = await res.json();
                showToast(`❌ فشل التحديث: ${err.error}`, 'error');
            }
        } else {
            productData.id = Date.now();
            res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                showToast('✅ تم إضافة المنتج بنجاح!', 'success');
                resetForm();
                await loadProducts(); // ✅ Force reload مع await
            } else {
                const err = await res.json();
                showToast(`❌ فشل الإضافة: ${err.error}`, 'error');
            }
        }
    } catch (error) {
        showToast(`❌ خطأ: ${error.message}`, 'error');
    }
});

// ─── Edit Product ──────────────────────────────────────────
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    isEditing = true;
    editId.value = product.id;
    name.value = product.name;
    price.value = product.price;
    oldPrice.value = product.oldPrice || '';
    discount.value = product.discountPercentage || '';
    category.value = product.category || 'Electronics';
    storeName.value = product.storeName || '';
    stock.value = product.stock;
    image.value = product.image || '';
    description.value = product.description || '';
    whatsapp.value = product.whatsapp_number || '';
    facebook.value = product.facebook_page || '';
    contactEmail.value = product.contact_email || '';

    formTitle.textContent = '✏️ تعديل المنتج';
    submitBtn.textContent = '💾 حفظ التعديلات';
    cancelBtn.style.display = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Cancel Edit ──────────────────────────────────────────
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    isEditing = false;
    form.reset();
    editId.value = '';
    formTitle.textContent = '➕ إضافة منتج جديد';
    submitBtn.textContent = '➕ إضافة المنتج';
    cancelBtn.style.display = 'none';
}

// ─── Delete Product ────────────────────────────────────────
async function deleteProduct(id) {
    if (!confirm('⚠️ هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            showToast('🗑️ تم حذف المنتج', 'info');
            await loadProducts(); // ✅ Force reload مع await
        } else {
            const err = await res.json();
            showToast(`❌ فشل الحذف: ${err.error}`, 'error');
        }
    } catch (error) {
        showToast(`❌ خطأ: ${error.message}`, 'error');
    }
}

// ─── Init ───────────────────────────────────────────────────
loadProducts();

// ─── Auto-refresh every 60 seconds (أقل اهتزاز) ──────────
setInterval(loadProducts, 60000);