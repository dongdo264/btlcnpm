-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 30, 2022 lúc 03:52 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlbh`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `CatID` int(11) NOT NULL,
  `CatBrand` varchar(50) COLLATE utf8_vietnamese_ci NOT NULL,
  `CatName` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `CatPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`CatID`, `CatBrand`, `CatName`, `CatPrice`) VALUES
(1, 'Nike', 'Nike thể thao nam', 200000),
(2, 'Nike', 'Nike thể thao nam nữ ', 180000),
(3, 'Adidas', 'Adidas thể thao', 200000),
(5, 'Vans', 'Vans đẹp nhất thế giới', 300000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `catID` int(11) NOT NULL,
  `catName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`catID`, `catName`) VALUES
(1, 'Di?n tho?i'),
(2, 'M?y t?nh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customerID`, `customerName`, `phone`, `address`) VALUES
(320498, NULL, NULL, NULL),
(322203, NULL, NULL, NULL),
(350785, NULL, NULL, NULL),
(481089, NULL, NULL, NULL),
(531302, NULL, NULL, NULL),
(537130, NULL, NULL, NULL),
(738170, NULL, NULL, NULL),
(788874, NULL, NULL, NULL),
(927459, NULL, NULL, NULL),
(1037794, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customerscart`
--

CREATE TABLE `customerscart` (
  `productId` int(11) NOT NULL,
  `customerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customerscart`
--

INSERT INTO `customerscart` (`productId`, `customerID`) VALUES
(12, 927459),
(12, 738170),
(16, 320498),
(11, 1037794),
(12, 1037794);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productDescription` varchar(1000) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `style` varchar(100) DEFAULT NULL,
  `quantityOdered` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productID`, `productName`, `productDescription`, `productPrice`, `style`, `quantityOdered`) VALUES
(10, 'Nike Mercurial Vapor 14 Pro TF Blueprint pack – Chlorine Blue / Laser Orange DJ2851-484', 'Giày Nike Mercurial Vapor 14 Pro TF Blueprint pack– Chlorine Blue / Laser Orange phiên bản Vapor Pro 14 năm 2022 mới nhất, model giày bóng đá Nike Mercurial Vapor 14 Pro cực kỳ được yêu thích ở Việt Nam', 2900000, 'TF, cỏ nhân tạo', 0),
(11, 'Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue', 'Giày Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue thấp cổ, giày Phantom GT cổ truyền thống… sản phẩm hoàn toàn mới, thiết kế trẻ trung và mạnh mẽ, ngoại thất cực đẹp', 1400000, 'FG, cỏ tự nhiên', 0),
(12, 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity', 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity đây là phiên bản đặc biệt và độc quyền dành cho Ronaldo tại Euro 2020, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao, được gọi là Spark Positivity pack, model giày Nike Mercurial', 2200000, 'TF, cỏ nhân tạo', 0),
(14, 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver nằm trong loạt sản phẩm độc quyền dảnh riêng cho siêu sao nước Pháp và CLB PSG, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao', 2600000, 'TF, cỏ nhân tạo', 0),
(15, 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow', 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow chính hãng, một trong những đôi giày Nike Tiempo nhẹ nhất từng được sản xuất nhưng vẫn giữ được mọi ưu điểm của dòng giày đá bóng huyền thoại này', 2200000, 'FG, cỏ tự nhiên', 0),
(16, 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver giày bóng đá Nike chính hãng, giày bóng đá sân cỏ nhân tạo, giày đá bóng sân cỏ tự nhiên, đế giày kiểu MG phù hợp chơi bóng trên cả 2 mặt sân, đế giày kiểu lai, upper làm từ da', 1800000, 'FG, Cỏ tự nhiên', 0),
(17, 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver giày đá bóng sân cỏ tự nhiên, giày đá bóng Nike chính hãng, giày đá bóng Nike Mercurial chính hãng, upper làm từ da tổng hợp kết hợp sợi, trọng lượng giày cực nhẹ', 2700000, 'FG, Cỏ tự nhiên', 0),
(18, 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson', 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson cực đẹp, kết hợp màu trắng-đỏ và chuối siêu đẹp ! Giày đá bóng Nike Tiempo Legend 9 Academy TF chính hãng, một trong những đôi giày Nike đẹp nhất', 1850000, 'TF, Cỏ nhân tạo', 0),
(19, 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue', 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue cao cổ, giày Nike Superfly 8 TF, sản phẩm Nike Mercurial Superfly 8 Academy mới nhất, dòng sản phẩm mới ra mắt 2021', 2100000, 'TF, Cỏ nhân tạo', 0),
(20, 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush', 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush giày trắng pha xanh cực đẹp nằm trong Diamond Edge pack , phân khúc siêu cao cấp, trọng lượng siêu nhẹ với khoảng 200 gram/chiếc', 5000000, 'FG, Cỏ tự nhiên', 0),
(21, 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White', 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White nằm trong bộ sưu tập giày Sapphire Edge pack cực đẹp. Giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ', 1850000, 'TF, Cỏ nhân tạo', 0),
(22, 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo ưu ý đây là phiên bản cổ cao ( phiên bản cổ thấp có chữ L trong tên sản phẩm- viết tắt của Low) , model mới nhất đã cập bến, một sản phẩm tuyệt vời', 2400000, 'TF, Cỏ nhân tạo', 0),
(23, 'Adidas Predator Edge .4 TF- Core Black', 'Adidas Predator Edge .4 TF- Core Black upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi trên sân cỏ nhân tạo…. đây là một sản phẩm phổ thông đáp ứng nhu cầu chơi bóng tốt nhất khi có độ', 1300000, 'TF, Cỏ nhân tạo', 0),
(24, 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow', 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật – da bê cực mềm, đế giày kiểu TF phù hợp với sân cỏ nhân tạo', 4500000, 'TF, Cỏ nhân tạo', 0),
(25, 'Adidas X Speedflow .1 TF Messi Mi Historia- Solar Gold/ Core Black/ Bright Yellow', 'Adidas X Speedflow .1 TF Messi Mi Historia- Solar Gold/ Core Black/ Bright Yellow nằm trong loạt sản phẩm độc quyền dành riêng cho siêu sao Messi gọi là Mi Historia – My History : lịch sử của tôi, đây là siêu phẩm cao cấp nhất dành cho bạn', 3200000, 'TF, Cỏ nhân tạo', 0),
(26, 'Adidas X Ghosted .3 Laceless LL TF – Solar Yellow / Core Black/ Team Royal Blue', 'Adidas X Ghosted .3 Laceless LL TF – Solar Yellow / Core Black/ Team Royal Blue là thế hệ tiếp theo của dòng giày huyền thoại Adidas X, với những cải tiến mới, xứng đáng là một trong những đôi giày đáng chơi nhất hiện nay', 4700000, 'TF, Cỏ nhân tạo', 0),
(27, 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue', 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue nằm trong bộ sưu tập giày Adidas Superlative, upper của giày kết hợp màu trắng vôi kết hợp 3 sọc dọc màu xám nhạt gây mê đắm cho anh em chơi', 1600000, 'TF, Cỏ nhân tạo', 0),
(28, 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo', 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo nằm trong bộ sưu tập giày Adidas Sapphire Edge pack, giày đá bóng Adidas Predator Edge… Model giày đá bóng Adidas mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp', 1900000, 'TF, Cỏ nhân tạo', 0),
(29, 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush', 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush nằm trong bộ sưu tập Adidas Edge of Darkness pack, giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật', 1900000, 'TF, Cỏ nhân tạo', 0),
(30, 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng', 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng cực đẹp, giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ đỉnh cao', 1850000, 'TF, Cỏ nhân tạo', 0),
(31, 'Puma Future Future Z 3.1 TT TF xanh chuối', 'Puma Future Future Z 3.1 TT TF xanh chuối giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0),
(32, 'Puma King Pro TT – Black/ White', 'Puma King Pro TT – Black/ White da thật, upper được làm từ da kangaroo cực mềm mại, thiết kế kiểu cổ điển cực đẹp, vẻ đẹp bền lâu cùng dòng Puma King, trong lượng được cải thiện giúp nhẹ nhàng hơn so với thế hệ cũ', 3200000, 'TF, Cỏ nhân tạo', 0),
(33, 'Puma Ultra 3.2 TT – Black/ White/ Yellow', 'Puma Ultra 3.2 TT – Black/ White/ Yellow giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1650000, 'TF, Cỏ nhân tạo', 0),
(34, 'Giày Puma Ultra 4.2 TF', 'Giày Puma Ultra 4.2 TF giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1300000, 'TF, Cỏ nhân tạo', 0),
(35, 'Puma Ultra 3.2 TF – White/ Red Blast', 'Puma Ultra 3.2 TF – White/ Red Blast giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0),
(36, 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert', 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert nằm trong bộ sưu tập Puma Speed of Light cực đẹp, sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới', 5400000, 'TF, Cỏ nhân tạo', 0),
(37, 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink', 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink hoàn toàn mới, giày bóng đá Puma Ultra cực đẹp, giày đá bóng Puma đế FG phù hợp với sân cỏ tự nhiên, giày đá bóng Puma sân cỏ tự nhiên', 2100000, 'FG, Cỏ tự nhiên', 0),
(38, 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black', 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black giày đá bóng Puma chính hãng, sản phẩm cao cấp của Puma, tương đương các mẫu Adidas 19.1 TF, upper làm từ sợi kết hợp da tổng hợp, upper kiểu liền khối- không lưỡi gà, đế giày kiểu TF đá sân cỏ', 3100000, 'TF, Cỏ nhân tạo', 0),
(39, 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow', 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow giày bóng đá sân cỏ nhân tạo, giày bóng đá Puma chính hãng, upper làm từ da thật cực mềm kết hợp dạng sợi, cổ giày được kéo cao liền', 1850000, 'TF, Cỏ nhân tạo', 0),
(40, 'Puma Future 5.3 Netfit MG/AG – Ultra Yellow / Puma Black', 'Trải nghiệm Puma Future 5.3 MG, phiên bản tuyệt vời nhất chơi bóng trên sân cỏ nhân tạo hay tự nhiên. Puma Future 5.3 MG, món hàng được săn đón nhiều nhất trong năm', 1899000, 'TF, Cỏ nhân tạo', 0),
(41, 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black', 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO độc quyền chế tạo', 5499000, 'Cỏ nhân tạo, AG, TF, Cỏ tự nhiên', 0),
(42, 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink', 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO', 6000000, 'FG, Cỏ tự nhiên', 0),
(43, 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo màu xanh dương cực đẹp, nằm trong bộ sưu tập Sapphire Edge pack cực đẹp, là sản phẩm cao cấp nhất dành cho anh em có điều kiện, được sử dụng những công nghệ tân tiến nhất', 4999999, 'FG, Cỏ tự nhiên', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CatID`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`catID`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`);

--
-- Chỉ mục cho bảng `customerscart`
--
ALTER TABLE `customerscart`
  ADD KEY `fk_cart_products` (`productId`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `catID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `customerscart`
--
ALTER TABLE `customerscart`
  ADD CONSTRAINT `fk_cart_products` FOREIGN KEY (`productId`) REFERENCES `products` (`productID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
