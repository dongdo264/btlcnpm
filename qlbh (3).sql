-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 22, 2022 lúc 03:55 AM
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
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT '$2a$08$K2MVB1zxjAi/2YsB7nfvYONGP3lE6HL4Sp4Xy2jhLksFM6ENKfs0K'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`username`, `password`) VALUES
('Admin', '$2a$08$K2MVB1zxjAi/2YsB7nfvYONGP3lE6HL4Sp4Xy2jhLksFM6ENKfs0K');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customercart`
--

CREATE TABLE `customercart` (
  `customerID` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customercart`
--

INSERT INTO `customercart` (`customerID`, `productId`, `size`, `quantity`) VALUES
(33197955, 14, 41, 1),
(88069528, 43, 41, 1),
(37161552, 16, 41, 2),
(37161552, 16, 42, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderNumber` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `priceEach` int(11) NOT NULL,
  `size` int(11) NOT NULL DEFAULT 39
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orderdetails`
--

INSERT INTO `orderdetails` (`orderNumber`, `productID`, `quantity`, `priceEach`, `size`) VALUES
(95733923, 20, 2, 5000000, 40),
(72522714, 34, 3, 1300000, 42),
(72522714, 42, 2, 6000000, 41),
(72522714, 36, 2, 5400000, 42),
(81989779, 23, 1, 1300000, 42),
(92136490, 16, 1, 1800000, 41),
(92136490, 30, 1, 1850000, 41),
(101972173, 20, 1, 5000000, 41),
(101972173, 24, 1, 4500000, 41),
(54662306, 20, 1, 5000000, 42),
(54662306, 20, 1, 5000000, 43);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `orderNumber` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` varchar(500) NOT NULL,
  `orderDate` date NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`orderNumber`, `customerID`, `customerName`, `phone`, `address`, `orderDate`, `comment`, `status`) VALUES
(54662306, 36636637, 'Quách Văn Quẹ', '0963712656', 'Ba Vì - Hà Nội', '2022-04-22', 'Không', 'pending'),
(72522714, 65274240, 'Đỗ Công Đồng', '0963712656', 'Ba Vì - Hà Nội', '2022-04-21', 'Không', 'pending'),
(81989779, 73109347, 'Nguyễn Văn A', '0963712656', 'Hà Nội', '2022-04-21', 'Không', 'pending'),
(92136490, 36636637, 'Quách Văn Quẹ Quẹ', '0963712656', 'Ba Vì - Hà Nội', '2022-04-22', 'Không', 'pending'),
(95733923, 65274240, 'Nguyễn Văn B', '0963712222', 'Ba Vì - Hà Nội', '2022-04-21', 'Không', 'Đang xử lý'),
(101972173, 36636637, 'Nguyễn Văn B', '0999999999', 'Ba Vì - Hà Nội', '2022-04-22', 'Không', 'pending');

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
  `quantityOrdered` int(11) DEFAULT NULL,
  `quantityInStock` int(11) NOT NULL DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productID`, `productName`, `productDescription`, `productPrice`, `style`, `quantityOrdered`, `quantityInStock`) VALUES
(10, 'Nike Mercurial Vapor 14 Pro TF Blueprint pack – Chlorine Blue / Laser Orange DJ2851-484', 'Giày Nike Mercurial Vapor 14 Pro TF Blueprint pack– Chlorine Blue / Laser Orange phiên bản Vapor Pro 14 năm 2022 mới nhất, model giày bóng đá Nike Mercurial Vapor 14 Pro cực kỳ được yêu thích ở Việt Nam', 2900000, 'TF, cỏ nhân tạo', 1, 20),
(11, 'Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue', 'Giày Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue thấp cổ, giày Phantom GT cổ truyền thống… sản phẩm hoàn toàn mới, thiết kế trẻ trung và mạnh mẽ, ngoại thất cực đẹp', 1400000, 'FG, cỏ tự nhiên', 8, 20),
(12, 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity', 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity đây là phiên bản đặc biệt và độc quyền dành cho Ronaldo tại Euro 2020, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao, được gọi là Spark Positivity pack, model giày Nike Mercurial', 2200000, 'TF, cỏ nhân tạo', 4, 0),
(14, 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver nằm trong loạt sản phẩm độc quyền dảnh riêng cho siêu sao nước Pháp và CLB PSG, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao', 2600000, 'TF, cỏ nhân tạo', 0, 20),
(15, 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow', 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow chính hãng, một trong những đôi giày Nike Tiempo nhẹ nhất từng được sản xuất nhưng vẫn giữ được mọi ưu điểm của dòng giày đá bóng huyền thoại này', 2200000, 'FG, cỏ tự nhiên', 0, 20),
(16, 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver giày bóng đá Nike chính hãng, giày bóng đá sân cỏ nhân tạo, giày đá bóng sân cỏ tự nhiên, đế giày kiểu MG phù hợp chơi bóng trên cả 2 mặt sân, đế giày kiểu lai, upper làm từ da', 1800000, 'FG, Cỏ tự nhiên', 0, 20),
(17, 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver giày đá bóng sân cỏ tự nhiên, giày đá bóng Nike chính hãng, giày đá bóng Nike Mercurial chính hãng, upper làm từ da tổng hợp kết hợp sợi, trọng lượng giày cực nhẹ', 2700000, 'FG, Cỏ tự nhiên', 2, 20),
(18, 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson', 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson cực đẹp, kết hợp màu trắng-đỏ và chuối siêu đẹp ! Giày đá bóng Nike Tiempo Legend 9 Academy TF chính hãng, một trong những đôi giày Nike đẹp nhất', 1850000, 'TF, Cỏ nhân tạo', 1, 20),
(19, 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue', 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue cao cổ, giày Nike Superfly 8 TF, sản phẩm Nike Mercurial Superfly 8 Academy mới nhất, dòng sản phẩm mới ra mắt 2021', 2100000, 'TF, Cỏ nhân tạo', 1, 20),
(20, 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush', 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush giày trắng pha xanh cực đẹp nằm trong Diamond Edge pack , phân khúc siêu cao cấp, trọng lượng siêu nhẹ với khoảng 200 gram/chiếc', 5000000, 'FG, Cỏ tự nhiên', 3, 20),
(21, 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White', 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White nằm trong bộ sưu tập giày Sapphire Edge pack cực đẹp. Giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ', 1850000, 'TF, Cỏ nhân tạo', 4, 20),
(22, 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo ưu ý đây là phiên bản cổ cao ( phiên bản cổ thấp có chữ L trong tên sản phẩm- viết tắt của Low) , model mới nhất đã cập bến, một sản phẩm tuyệt vời', 2400000, 'TF, Cỏ nhân tạo', 3, 20),
(23, 'Adidas Predator Edge .4 TF- Core Black', 'Adidas Predator Edge .4 TF- Core Black upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi trên sân cỏ nhân tạo…. đây là một sản phẩm phổ thông đáp ứng nhu cầu chơi bóng tốt nhất khi có độ', 1300000, 'TF, Cỏ nhân tạo', 0, 20),
(24, 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow', 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật – da bê cực mềm, đế giày kiểu TF phù hợp với sân cỏ nhân tạo', 4500000, 'TF, Cỏ nhân tạo', 1, 20),
(27, 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue', 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue nằm trong bộ sưu tập giày Adidas Superlative, upper của giày kết hợp màu trắng vôi kết hợp 3 sọc dọc màu xám nhạt gây mê đắm cho anh em chơi', 1600000, 'TF, Cỏ nhân tạo', 0, 20),
(28, 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo', 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo nằm trong bộ sưu tập giày Adidas Sapphire Edge pack, giày đá bóng Adidas Predator Edge… Model giày đá bóng Adidas mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp', 1900000, 'TF, Cỏ nhân tạo', 0, 20),
(29, 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush', 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush nằm trong bộ sưu tập Adidas Edge of Darkness pack, giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật', 1900000, 'TF, Cỏ nhân tạo', 0, 20),
(30, 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng', 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng cực đẹp, giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ đỉnh cao', 1850000, 'TF, Cỏ nhân tạo', 1, 20),
(31, 'Puma Future Future Z 3.1 TT TF xanh chuối', 'Puma Future Future Z 3.1 TT TF xanh chuối giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0, 20),
(32, 'Puma King Pro TT – Black/ White', 'Puma King Pro TT – Black/ White da thật, upper được làm từ da kangaroo cực mềm mại, thiết kế kiểu cổ điển cực đẹp, vẻ đẹp bền lâu cùng dòng Puma King, trong lượng được cải thiện giúp nhẹ nhàng hơn so với thế hệ cũ', 3200000, 'TF, Cỏ nhân tạo', 0, 20),
(33, 'Puma Ultra 3.2 TT – Black/ White/ Yellow', 'Puma Ultra 3.2 TT – Black/ White/ Yellow giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1650000, 'TF, Cỏ nhân tạo', 1, 20),
(34, 'Giày Puma Ultra 4.2 TF', 'Giày Puma Ultra 4.2 TF giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1300000, 'TF, Cỏ nhân tạo', 0, 20),
(35, 'Puma Ultra 3.2 TF – White/ Red Blast', 'Puma Ultra 3.2 TF – White/ Red Blast giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0, 20),
(36, 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert', 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert nằm trong bộ sưu tập Puma Speed of Light cực đẹp, sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới', 5400000, 'TF, Cỏ nhân tạo', 0, 20),
(37, 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink', 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink hoàn toàn mới, giày bóng đá Puma Ultra cực đẹp, giày đá bóng Puma đế FG phù hợp với sân cỏ tự nhiên, giày đá bóng Puma sân cỏ tự nhiên', 2100000, 'FG, Cỏ tự nhiên', 1, 20),
(38, 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black', 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black giày đá bóng Puma chính hãng, sản phẩm cao cấp của Puma, tương đương các mẫu Adidas 19.1 TF, upper làm từ sợi kết hợp da tổng hợp, upper kiểu liền khối- không lưỡi gà, đế giày kiểu TF đá sân cỏ', 3100000, 'TF, Cỏ nhân tạo', 0, 20),
(39, 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow', 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow giày bóng đá sân cỏ nhân tạo, giày bóng đá Puma chính hãng, upper làm từ da thật cực mềm kết hợp dạng sợi, cổ giày được kéo cao liền', 1850000, 'TF, Cỏ nhân tạo', 1, 20),
(40, 'Puma Future 5.3 Netfit MG/AG – Ultra Yellow / Puma Black', 'Trải nghiệm Puma Future 5.3 MG, phiên bản tuyệt vời nhất chơi bóng trên sân cỏ nhân tạo hay tự nhiên. Puma Future 5.3 MG, món hàng được săn đón nhiều nhất trong năm', 1899000, 'TF, Cỏ nhân tạo', 2, 20),
(41, 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black', 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO độc quyền chế tạo', 5499000, 'Cỏ nhân tạo, AG, TF, Cỏ tự nhiên', 0, 20),
(42, 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink', 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO', 6000000, 'FG, Cỏ tự nhiên', 1, 20),
(43, 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo màu xanh dương cực đẹp, nằm trong bộ sưu tập Sapphire Edge pack cực đẹp, là sản phẩm cao cấp nhất dành cho anh em có điều kiện, được sử dụng những công nghệ tân tiến nhất', 4999999, 'FG, Cỏ tự nhiên', 1, 20),
(44, 'Mizuno Monarcida Neo II Select AS TF – Blue / White / Red', 'Mizuno Monarcida Neo II Select AS TF – Blue / White / Red giày bóng đá Mizuno chính hãng, upper làm từ da tổng hợp mềm mại, đế TF phù hợp với sân cỏ nhân tạo, cực kỳ phù hợp với phom chân bè, dễ đi dễ xỏ', 1399000, 'TF, Cỏ nhân tạo', 0, 20),
(45, 'Mizuno Morelia Neo III Pro TF – Light Blue / White / Red', 'Mizuno Morelia Neo III Pro TF – Light Blue / White / Red giày bóng đá Mizuno chính hãng, upper làm từ da tổng hợp mềm mại, đế TF phù hợp với sân cỏ nhân tạo, cực kỳ phù hợp với phom chân bè, dễ đi dễ xỏ', 3050000, 'TF, Cỏ nhân tạo', 0, 20),
(46, 'Mizuno Monarcida Neo Sala Club – White / Blue/ Red', 'Mizuno Monarcida Neo Sala Club – White / Blue/ Red giày đá bóng chính hãng Mizuno, sản phẩm đến từ Nhật Bản phù hợp với chân người Châu Á khi chiều chuộng được cả những anh em chơi chân to ngang, và cả những anh em chân thon', 1299000, 'TF, Cỏ nhân tạo', 4, 20),
(47, 'Mizuno Morelia Neo KL II AS TF- Solar Yellow/ Deep Ocean', 'Mizuno Morelia Neo KL II AS TF- Solar Yellow/ Deep Ocean, giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, giày đá bóng Mizuno chính hãng, giày bóng đá Mizuno là thương hiệu đến từ Nhật Bản, ở Nhật thì dân họ chỉ dùng Mizuno', 2850000, 'TF, Cỏ nhân tạo', 0, 20),
(48, 'Kamito TA11 TF – Xanh lá/Vàng', 'Kamito TA11 TF – Xanh lá/Vàng, giày đá bóng chính hãng, model giày bóng đá tốt nhất ở phân khúc giá dưới 1 triệu đồng tại Việt Nam dành cho sân cỏ nhân tạo. Chỉ với một ngân sách vừa phải anh em có thể sắm được sản phẩm', 699000, 'TF, Cỏ nhân tạo', 0, 20),
(49, 'Mizuno Morelia Neo III Pro AS TF – Core White / Volt / Light Pink', 'Mizuno Morelia Neo III Pro AS TF – Core White / Volt / Light Pink , giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, upper làm tư da tổng hợp, đế giày kiểu TF phù hợp với sân cỏ nhân tạo', 2999000, 'TF, Cỏ nhân tạo', 1, 20),
(50, 'Adidas Predator Freak .1 L FG Superspectral – Black/ White/ Shock Pink', 'Adidas Predator Freak .1 L FG Superspectral – Black/ White/ Shock Pink, giày đá bóng Adidas Predator Freak… Model giày đá bóng mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp', 2999000, 'FG, Cỏ tự nhiên', 0, 20),
(51, 'Adidas X Ghosted .1 FG Superspectral- Shock Pink/ Core Black/ Screaming Orange', 'Adidas X Ghosted .1 FG Superspectral- Shock Pink/ Core Black/ Screaming Orange , giày đá bóng siêu nhẹ dành cho sân cỏ tự nhiên, upper Fluroskin cực mềm mại, khung sườn kiểu SpeedFrame siêu nhẹ khiến trọng lượng chỉ dưới 200 gram/chiếc', 5000000, 'FG, Cỏ tự nhiên', 2, 20),
(52, 'Adidas Predator Freak + TF Meteorite- Solar Red/ Black/ White', 'Adidas Predator Freak + TF Meteorite- Solar Red/ Black/ White, giày đá bóng chính hãng, giày đá bóng không dây, giày đá bóng Adidas chính hãng, nằm trong bộ sưu tập giày Adidas Meteorite pack, giày đá bóng Adidas Predator Freak… Model giày đá bóng mới nhất', 4200000, 'FG, Cỏ tự nhiên', 0, 20),
(53, 'Adidas Predator Freak .3 L FG White Spark – Cloud White / Iron Metallic / Solar Red', 'Adidas Predator Freak .3 L FG White Spark – Cloud White / Iron Metallic / Solar Red mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp và mang đầy đủ công nghệ đỉnh cao nhất. Đây là phiên bản thấp cổ, đế FG phù hợp chơi bóng trên sân cỏ tự nhiên. Upper có 2 lớp, bên trong là sợi và bên ngoài được phủ da tổng hợp. Dòng sản phẩm giày Adidas Predator Freak định hướng sử dụng cho các tiền vệ công thượng thừa như Pogba', 1900000, 'FG, Cỏ tự nhiên', 0, 20),
(54, 'Nike Mercurial Superfly 8 Pro FG – Black/ Cyber/ Off Noir', 'Nike Mercurial Superfly 8 Pro FG – Black/ Cyber/ Off Noir', 4200000, 'FG, Cỏ tự nhiên', 1, 20),
(55, 'Nike Phantom GT Academy Flyease FG/MG – Photo Blue/ Metallic Silver', 'Nike Phantom GT Academy Flyease FG/MG – Photo Blue/ Metallic Silver thấp cổ, giày Phantom GT cổ truyền thống… sản phẩm hoàn toàn mới, thiết kế trẻ trung và mạnh mẽ, ngoại thất cực đẹp… dòng giày Nike Phantom GT hướng tới lối chơi toàn diện, hỗ trợ khả năng rê bóng, chuyển bóng và sút bóng', 1700000, 'FG, Cỏ tự nhiên', 0, 20),
(56, 'Adidas Nemeziz .4 TF- Team Royal Blue/ Solar Yellow/ Core Black', 'Adidas Nemeziz .4 TF- Team Royal Blue/ Solar Yellow/ Core Black, giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, giày đá bóng Adidas chính hãng, giày đá bóng Adidas Nemeziz .4 TF, đế TF đá trên sân cỏ nhân tạo, upper làm từ da tổng hợp', 1800000, 'TF,Cỏ nhân tạo', 0, 20),
(57, 'Adidas Nemeziz 19.3 FG InFlight- Signal Coral/ Core Black/ Glory Red', 'Adidas Nemeziz 19.3 FG InFlight- Signal Coral/ Core Black/ Glory Red, nằm trong bộ sưu tập giày Adidas InFlight 2020 cực đẹp,  giày đá bóng chính hãng, giày Adidas Nemeziz 19.3 FG, upper làm từ sợi và da tổng hợp, đế giày kiểu FG phù hợp chơi bóng trên sân cỏ tự nhiên', 1400000, 'FG,Cỏ tự nhiên', 1, 20);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`username`);

--
-- Chỉ mục cho bảng `customercart`
--
ALTER TABLE `customercart`
  ADD KEY `fk_customercart_products` (`productId`);

--
-- Chỉ mục cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD KEY `fk_orderdetails_orders` (`orderNumber`),
  ADD KEY `fk_orderdetails_products` (`productID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderNumber`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `orderNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101972174;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `customercart`
--
ALTER TABLE `customercart`
  ADD CONSTRAINT `fk_customercart_products` FOREIGN KEY (`productId`) REFERENCES `products` (`productID`);

--
-- Các ràng buộc cho bảng `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `fk_orderdetails_orders` FOREIGN KEY (`orderNumber`) REFERENCES `orders` (`orderNumber`),
  ADD CONSTRAINT `fk_orderdetails_products` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
