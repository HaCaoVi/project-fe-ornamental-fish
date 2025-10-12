import { ProductDetailView } from "@components/features/Product/product-detail-view"
import { RecommendedProducts } from "@components/features/Product/recommended-products"
import { AutoBreadcrumb } from "@components/lib/Breadcrumb"


// Mock data - in a real app, this would come from an API or database
const productData = {
    id: 1,
    name: "Betta Red Dragon",
    productCode: "BETTA-RD01",
    description: "Cá Betta Rồng Đỏ với vảy kim loại rực rỡ",
    price: 150000,
    color: "Đỏ",
    size: "3-4 cm",
    origin: "Việt Nam",
    image: "/test/blue-betta-fish-dragon.jpg",
    mainVideoUrl: "", // Leave empty to show zoom effect instead
    inStock: true,
    detailedDescription: `
    <h3>Betta Red Dragon</h3>
    <p><strong>Vảy đỏ rực rỡ với ánh kim loại</strong> - Cá Betta Rồng Đỏ là một trong những giống cá cảnh đẹp nhất với màu sắc nổi bật và vây dài uyển chuyển.</p>
    
    <h4>Đặc điểm nổi bật:</h4>
    <ul>
      <li><strong>Xuất xứ:</strong> Việt Nam</li>
      <li><strong>Kích thước:</strong> 3-4 cm (có thể lớn hơn khi trưởng thành)</li>
      <li><strong>Tính cách:</strong> Hiếu chiến với cá cùng loài, nên nuôi riêng</li>
      <li><strong>Tuổi thọ:</strong> 2-3 năm với chăm sóc tốt</li>
    </ul>

    <h4>Điều kiện nuôi:</h4>
    <p>Tốt nhất nên nuôi trong bể thủy sinh nhỏ với nhiệt độ <strong>26-30°C</strong>. Cá Betta thích nước sạch, pH từ 6.5-7.5 và cần không gian bơi lội thoải mái.</p>
    
    <h4>Chế độ ăn:</h4>
    <p>Thức ăn viên chuyên dụng cho cá Betta, giun chỉ, artemia. Cho ăn 1-2 lần/ngày với lượng vừa đủ.</p>
  `,
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const breadcrumbItems = [
        { label: "Trang Chủ", href: "/" },
        { label: "Cá Cảnh", href: "/products" },
        { label: "Betta", href: "/products?type=betta" },
        { label: "Betta Red Dragon", href: `/products/${params.id}` },
    ]

    return (
        <main className="flex-1 bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* <Breadcrumb items={breadcrumbItems} /> */}
                <AutoBreadcrumb />

                <ProductDetailView product={productData} />

                <RecommendedProducts currentProductId={productData.id} />
            </div>
        </main>
    )
}
