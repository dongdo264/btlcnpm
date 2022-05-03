-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 03, 2022 lúc 03:55 PM
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
('Admin', '$2a$08$r/pVk/E/AGCzfzwPcoD6de./0ASOof43cOmgvu97oU3DqQbOlEGFG');

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
(88069528, 43, 41, 1),
(37161552, 16, 42, 1),
(79964888, 51, 42, 1),
(79964888, 21, 42, 1),
(24280909, 20, 42, 1),
(24280909, 20, 41, 3),
(82788225, 15, 41, 1),
(82788225, 10, 39, 2),
(82788225, 14, 42, 1),
(82788225, 40, 43, 1);

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
(72522714, 34, 3, 1300000, 42),
(72522714, 42, 2, 6000000, 41),
(72522714, 36, 2, 5400000, 42),
(81989779, 23, 1, 1300000, 42),
(101972173, 20, 1, 5000000, 41),
(101972173, 24, 1, 4500000, 41),
(12603869, 16, 1, 1800000, 42),
(12603869, 18, 1, 1850000, 43),
(12603869, 24, 1, 4500000, 40),
(88073331, 31, 1, 1600000, 41),
(12786287, 11, 2, 1400000, 41),
(12786287, 20, 1, 5000000, 41),
(88549843, 16, 1, 1800000, 42),
(88549843, 11, 1, 1400000, 40),
(88549843, 11, 1, 1400000, 42),
(88549843, 50, 1, 2999000, 41),
(19151651, 16, 1, 1800000, 42),
(36742581, 10, 3, 2900000, 41),
(36742581, 11, 3, 1400000, 43),
(36742581, 12, 3, 2200000, 42),
(36742581, 14, 3, 2600000, 38);

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
  `status` varchar(255) NOT NULL DEFAULT 'Đang xử lý'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`orderNumber`, `customerID`, `customerName`, `phone`, `address`, `orderDate`, `comment`, `status`) VALUES
(12603869, 27987230, 'Nguyễn Văn Anhs', '01235667890', 'Ba Vì - Hà Nội', '2022-04-22', 'Không', 'Đã hoàn tất'),
(12786287, 36391902, 'Quách Văn Quẹ', '0963712111', 'Hà Nội', '2022-04-27', 'Không', 'Đang giao hàng'),
(19151651, 82788225, 'Nguyễn Văn A', '0963712222', 'Hà Nội', '2022-05-01', 'Không', 'Đang xử lý'),
(36742581, 50833011, 'Tạ Văn Tấn', '0999999999', 'Gò Vấp', '2022-05-01', 'Không', 'Đã hoàn tất'),
(72522714, 65274240, 'Đỗ Công Đồng', '0963712656', 'Ba Vì - Hà Nội', '2022-04-21', 'Không', 'Đã hoàn tất'),
(81989779, 73109347, 'Nguyễn Văn A', '0963712656', 'Hà Nội', '2022-04-21', 'Không', 'Đã hoàn tất'),
(88073331, 79964888, 'Nguyễn Văn A', '0963712222', 'Ba Vì - Hà Nội', '2022-04-25', 'Không', 'Đang giao hàng'),
(88549843, 82788225, 'Quách Văn Quẹ', '0963712656', 'Ba Vì - Hà Nội', '2022-05-01', 'Không', 'Đang xử lý'),
(101972173, 36636637, 'Nguyễn Văn B', '0999999999', 'Ba Vì - Hà Nội', '2022-04-22', 'Không', 'Bị hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productdetails`
--

CREATE TABLE `productdetails` (
  `productID` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `quantityInStock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `productdetails`
--

INSERT INTO `productdetails` (`productID`, `size`, `quantityInStock`) VALUES
(10, 38, 10),
(10, 39, 10),
(10, 40, 10),
(10, 41, 7),
(10, 42, 10),
(11, 38, 10),
(11, 39, 10),
(11, 40, 10),
(11, 41, 10),
(11, 42, 10),
(11, 43, 7),
(12, 38, 0),
(12, 39, 10),
(12, 40, 10),
(12, 41, 10),
(12, 42, 7),
(12, 43, 0),
(14, 38, 7),
(14, 39, 10),
(14, 40, 10),
(14, 41, 10),
(14, 42, 10),
(14, 43, 10),
(15, 38, 0),
(15, 39, 10),
(15, 40, 10),
(15, 41, 0),
(15, 42, 10),
(15, 43, 10),
(16, 38, 0),
(16, 39, 10),
(16, 40, 10),
(16, 41, 10),
(16, 42, 10),
(16, 43, 0),
(17, 38, 0),
(17, 39, 0),
(17, 40, 0),
(17, 41, 0),
(17, 42, 0),
(17, 43, 0),
(18, 38, 0),
(18, 39, 10),
(18, 40, 0),
(18, 41, 0),
(18, 42, 10),
(18, 43, 0),
(19, 38, 0),
(19, 39, 10),
(19, 40, 10),
(19, 41, 0),
(19, 42, 10),
(19, 43, 0),
(20, 38, 7),
(20, 39, 10),
(20, 40, 10),
(20, 41, 0),
(20, 42, 0),
(20, 43, 10),
(21, 38, 7),
(21, 39, 10),
(21, 40, 10),
(21, 41, 0),
(21, 42, 10),
(21, 43, 0),
(22, 38, 7),
(22, 39, 10),
(22, 40, 10),
(22, 41, 0),
(22, 42, 10),
(22, 43, 0),
(23, 38, 7),
(23, 39, 0),
(23, 40, 10),
(23, 41, 10),
(23, 42, 0),
(23, 43, 10),
(24, 38, 0),
(24, 39, 10),
(24, 40, 10),
(24, 41, 10),
(24, 42, 10),
(24, 43, 10),
(27, 38, 0),
(27, 39, 10),
(27, 40, 10),
(27, 41, 10),
(27, 42, 10),
(27, 43, 0),
(28, 38, 0),
(28, 39, 0),
(28, 40, 0),
(28, 41, 10),
(28, 42, 0),
(28, 43, 0),
(29, 38, 10),
(29, 39, 10),
(29, 40, 0),
(29, 41, 10),
(29, 42, 0),
(29, 43, 0),
(30, 38, 10),
(30, 39, 10),
(30, 40, 10),
(30, 41, 10),
(30, 42, 10),
(30, 43, 0),
(31, 38, 10),
(31, 39, 10),
(31, 40, 10),
(31, 41, 10),
(31, 42, 10),
(31, 43, 0),
(32, 38, 0),
(32, 39, 10),
(32, 40, 0),
(32, 41, 0),
(32, 42, 10),
(32, 43, 0),
(33, 38, 10),
(33, 39, 10),
(33, 40, 0),
(33, 41, 10),
(33, 42, 10),
(33, 43, 0),
(34, 38, 10),
(34, 39, 10),
(34, 40, 0),
(34, 41, 0),
(34, 42, 10),
(34, 43, 10),
(35, 38, 0),
(35, 39, 0),
(35, 40, 0),
(35, 41, 0),
(35, 42, 10),
(35, 43, 10),
(37, 38, 10),
(37, 39, 10),
(37, 40, 10),
(37, 41, 10),
(37, 42, 10),
(37, 43, 10),
(38, 38, 10),
(38, 39, 10),
(38, 40, 0),
(38, 41, 10),
(38, 42, 10),
(38, 43, 0),
(39, 38, 0),
(39, 39, 10),
(39, 40, 0),
(39, 41, 10),
(39, 42, 10),
(39, 43, 0),
(40, 38, 0),
(40, 39, 10),
(40, 40, 0),
(40, 41, 10),
(40, 42, 10),
(40, 43, 10),
(41, 38, 0),
(41, 39, 10),
(41, 40, 10),
(41, 41, 10),
(41, 42, 10),
(41, 43, 0),
(42, 38, 0),
(42, 39, 0),
(42, 40, 0),
(42, 41, 10),
(42, 42, 0),
(42, 43, 0),
(43, 38, 0),
(43, 39, 10),
(43, 40, 10),
(43, 41, 10),
(43, 42, 0),
(43, 43, 10),
(44, 38, 0),
(44, 39, 10),
(44, 40, 10),
(44, 41, 0),
(44, 42, 0),
(44, 43, 0),
(45, 38, 0),
(45, 39, 10),
(45, 40, 10),
(45, 41, 10),
(45, 42, 10),
(45, 43, 0),
(46, 38, 0),
(46, 39, 10),
(46, 40, 10),
(46, 41, 10),
(46, 42, 10),
(46, 43, 10),
(47, 38, 0),
(47, 39, 0),
(47, 40, 10),
(47, 41, 0),
(47, 42, 10),
(47, 43, 0),
(48, 38, 0),
(48, 39, 10),
(48, 40, 10),
(48, 41, 0),
(48, 42, 10),
(48, 43, 0),
(49, 38, 10),
(49, 39, 10),
(49, 40, 10),
(49, 41, 0),
(49, 42, 10),
(49, 43, 0),
(50, 38, 10),
(50, 39, 0),
(50, 40, 10),
(50, 41, 0),
(50, 42, 10),
(50, 43, 0),
(51, 38, 0),
(51, 39, 0),
(51, 40, 10),
(51, 41, 0),
(51, 42, 10),
(51, 43, 0),
(52, 38, 0),
(52, 39, 10),
(52, 40, 10),
(52, 41, 10),
(52, 42, 10),
(52, 43, 0),
(53, 38, 0),
(53, 39, 0),
(53, 40, 0),
(53, 41, 0),
(53, 42, 0),
(53, 43, 0),
(54, 38, 0),
(54, 39, 10),
(54, 40, 0),
(54, 41, 10),
(54, 42, 10),
(54, 43, 10),
(55, 38, 10),
(55, 39, 10),
(55, 40, 0),
(55, 41, 10),
(55, 42, 10),
(55, 43, 0),
(56, 38, 0),
(56, 39, 0),
(56, 40, 0),
(56, 41, 10),
(56, 42, 10),
(56, 43, 0),
(57, 38, 0),
(57, 39, 0),
(57, 40, 0),
(57, 41, 0),
(57, 42, 0),
(57, 43, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productBrand` varchar(100) NOT NULL DEFAULT 'Adidas',
  `productName` varchar(255) NOT NULL,
  `productDescription` varchar(1000) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `style` varchar(100) DEFAULT NULL,
  `quantitySold` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`productID`, `productBrand`, `productName`, `productDescription`, `productPrice`, `style`, `quantitySold`) VALUES
(10, 'Nike', 'Nike Mercurial Vapor 14 Pro TF Blueprint pack – Chlorine Blue / Laser Orange DJ2851-484', 'Giày Nike Mercurial Vapor 14 Pro TF Blueprint pack– Chlorine Blue / Laser Orange phiên bản Vapor Pro 14 năm 2022 mới nhất, model giày bóng đá Nike Mercurial Vapor 14 Pro cực kỳ được yêu thích ở Việt Nam', 2900000, 'TF, cỏ nhân tạo', 3),
(11, 'Nike', 'Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue', 'Giày Nike Phantom GT Academy Flyease FG/MG- Black/ Cyber/ Light Photo Blue thấp cổ, giày Phantom GT cổ truyền thống… sản phẩm hoàn toàn mới, thiết kế trẻ trung và mạnh mẽ, ngoại thất cực đẹp', 1400000, 'FG, cỏ tự nhiên', 3),
(12, 'Nike', 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity', 'Nike Mercurial Superfly 8 Academy TF CR7 Euro 2020 Spark Positivity đây là phiên bản đặc biệt và độc quyền dành cho Ronaldo tại Euro 2020, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao, được gọi là Spark Positivity pack, model giày Nike Mercurial', 2200000, 'TF, cỏ nhân tạo', 3),
(14, 'Nike', 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy TF Mbappe Flames- Light Thistle/ Metallic Silver nằm trong loạt sản phẩm độc quyền dảnh riêng cho siêu sao nước Pháp và CLB PSG, colorway này là độc nhất chỉ xuất hiện trên dòng Superfly 8 cổ cao', 2600000, 'TF, cỏ nhân tạo', 3),
(15, 'Nike', 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow', 'Nike Tiempo Legend 9 Academy TF- Light Photo Blue/ Black/ Lime Glow chính hãng, một trong những đôi giày Nike Tiempo nhẹ nhất từng được sản xuất nhưng vẫn giữ được mọi ưu điểm của dòng giày đá bóng huyền thoại này', 2200000, 'FG, cỏ tự nhiên', 0),
(16, 'Nike', 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Superfly 8 Academy FG/AG- Bright Crimson/ Metallic Silver giày bóng đá Nike chính hãng, giày bóng đá sân cỏ nhân tạo, giày đá bóng sân cỏ tự nhiên, đế giày kiểu MG phù hợp chơi bóng trên cả 2 mặt sân, đế giày kiểu lai, upper làm từ da', 1800000, 'FG, Cỏ tự nhiên', 0),
(17, 'Nike', 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver', 'Nike Mercurial Vapor 14 Pro FG- Bright Crimson/ Metallic Silver giày đá bóng sân cỏ tự nhiên, giày đá bóng Nike chính hãng, giày đá bóng Nike Mercurial chính hãng, upper làm từ da tổng hợp kết hợp sợi, trọng lượng giày cực nhẹ', 2700000, 'FG, Cỏ tự nhiên', 0),
(18, 'Nike', 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson', 'Nike Tiempo Legend 9 Academy TF Motivation pack- White/ Volt/ Bright Crimson cực đẹp, kết hợp màu trắng-đỏ và chuối siêu đẹp ! Giày đá bóng Nike Tiempo Legend 9 Academy TF chính hãng, một trong những đôi giày Nike đẹp nhất', 1850000, 'TF, Cỏ nhân tạo', 0),
(19, 'Nike', 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue', 'Nike Mercurial Superfly 8 Academy TF Recharge pack- Sapphire/ Volt/ Blue cao cổ, giày Nike Superfly 8 TF, sản phẩm Nike Mercurial Superfly 8 Academy mới nhất, dòng sản phẩm mới ra mắt 2021', 2100000, 'TF, Cỏ nhân tạo', 0),
(20, 'Adidas', 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush', 'Adidas X Speedflow .1 FG Diamond Edge- Footwear White/ Legacy Indigo/ Sky Rush giày trắng pha xanh cực đẹp nằm trong Diamond Edge pack , phân khúc siêu cao cấp, trọng lượng siêu nhẹ với khoảng 200 gram/chiếc', 5000000, 'FG, Cỏ tự nhiên', 0),
(21, 'Adidas', 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White', 'Adidas X Speedflow .3 TF Sapphire Edge pack- Sky Rush/ Team Shock Pink/ White nằm trong bộ sưu tập giày Sapphire Edge pack cực đẹp. Giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ', 1850000, 'TF, Cỏ nhân tạo', 0),
(22, 'Adidas', 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .3 TF Sapphire Edge pack- Hi-res Blue/ Turbo ưu ý đây là phiên bản cổ cao ( phiên bản cổ thấp có chữ L trong tên sản phẩm- viết tắt của Low) , model mới nhất đã cập bến, một sản phẩm tuyệt vời', 2400000, 'TF, Cỏ nhân tạo', 0),
(23, 'Adidas', 'Adidas Predator Edge .4 TF- Core Black', 'Adidas Predator Edge .4 TF- Core Black upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi trên sân cỏ nhân tạo…. đây là một sản phẩm phổ thông đáp ứng nhu cầu chơi bóng tốt nhất khi có độ', 1300000, 'TF, Cỏ nhân tạo', 0),
(24, 'Adidas', 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow', 'Adidas Copa Sense .1 TF- Core Black/ White/ Solar Yellow giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật – da bê cực mềm, đế giày kiểu TF phù hợp với sân cỏ nhân tạo', 4500000, 'TF, Cỏ nhân tạo', 0),
(27, 'Adidas', 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue', 'Adidas Predator Freak .3 TF Superlative- Core Black / Cloud White / Royal Blue nằm trong bộ sưu tập giày Adidas Superlative, upper của giày kết hợp màu trắng vôi kết hợp 3 sọc dọc màu xám nhạt gây mê đắm cho anh em chơi', 1600000, 'TF, Cỏ nhân tạo', 0),
(28, 'Adidas', 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo', 'Adidas Predator Edge .3 L FG Sapphire Edge pack- Hi-Res Blue S18/ Turbo nằm trong bộ sưu tập giày Adidas Sapphire Edge pack, giày đá bóng Adidas Predator Edge… Model giày đá bóng Adidas mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp', 1900000, 'TF, Cỏ nhân tạo', 0),
(29, 'Adidas', 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush', 'Adidas Copa Sense .3 TF Edge of Darkness pack – Core Black/ Footwear White/ Blue Rush nằm trong bộ sưu tập Adidas Edge of Darkness pack, giày đá bóng chính hãng, giày sân cỏ nhân tạo, giày bóng đá Adidas Copa, upper làm từ da thật', 1900000, 'TF, Cỏ nhân tạo', 0),
(30, 'Adidas', 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng', 'Adidas X SpeedFlow .3 TF White Spark pack – màu trắng cực đẹp, giày đá bóng Adidas chính hãng, nằm trong thế hệ mới nhất Adidas SpeedFlow- dòng giày tốc độ đỉnh cao', 1850000, 'TF, Cỏ nhân tạo', 0),
(31, 'Puma', 'Puma Future Future Z 3.1 TT TF xanh chuối', 'Puma Future Future Z 3.1 TT TF xanh chuối giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0),
(32, 'Puma', 'Puma King Pro TT – Black/ White', 'Puma King Pro TT – Black/ White da thật, upper được làm từ da kangaroo cực mềm mại, thiết kế kiểu cổ điển cực đẹp, vẻ đẹp bền lâu cùng dòng Puma King, trong lượng được cải thiện giúp nhẹ nhàng hơn so với thế hệ cũ', 3200000, 'TF, Cỏ nhân tạo', 0),
(33, 'Puma', 'Puma Ultra 3.2 TT – Black/ White/ Yellow', 'Puma Ultra 3.2 TT – Black/ White/ Yellow giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1650000, 'TF, Cỏ nhân tạo', 0),
(34, 'Puma', 'Giày Puma Ultra 4.2 TF', 'Giày Puma Ultra 4.2 TF giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1300000, 'TF, Cỏ nhân tạo', 0),
(35, 'Puma', 'Puma Ultra 3.2 TF – White/ Red Blast', 'Puma Ultra 3.2 TF – White/ Red Blast giày đá bóng Puma chính hãng, giày đá bóng Puma Ultra, upper làm từ da tổng hợp, đế giày kiểu TF phù hợp chơi bóng trên sân cỏ nhân tạo', 1600000, 'TF, Cỏ nhân tạo', 0),
(36, 'Puma', 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert', 'Puma Ultra 1.2 MG/AG Speed of Light- Enegy Blue/ Yellow Alert nằm trong bộ sưu tập Puma Speed of Light cực đẹp, sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới', 5400000, 'TF, Cỏ nhân tạo', 0),
(37, 'Puma', 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink', 'Puma Ultra 3.1 FG/AG Turbo pack- Black/ Luminous Pink hoàn toàn mới, giày bóng đá Puma Ultra cực đẹp, giày đá bóng Puma đế FG phù hợp với sân cỏ tự nhiên, giày đá bóng Puma sân cỏ tự nhiên', 2100000, 'FG, Cỏ tự nhiên', 0),
(38, 'Puma', 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black', 'Puma 365 Concrete 1 St Roma TF- Energy Red/Red/Black giày đá bóng Puma chính hãng, sản phẩm cao cấp của Puma, tương đương các mẫu Adidas 19.1 TF, upper làm từ sợi kết hợp da tổng hợp, upper kiểu liền khối- không lưỡi gà, đế giày kiểu TF đá sân cỏ', 3100000, 'TF, Cỏ nhân tạo', 0),
(39, 'Puma', 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow', 'Puma One 20.3 TT/TF Rise pack- Energy Peach/ Fizzy Yellow giày bóng đá sân cỏ nhân tạo, giày bóng đá Puma chính hãng, upper làm từ da thật cực mềm kết hợp dạng sợi, cổ giày được kéo cao liền', 1850000, 'TF, Cỏ nhân tạo', 0),
(40, 'Puma', 'Puma Future 5.3 Netfit MG/AG – Ultra Yellow / Puma Black', 'Trải nghiệm Puma Future 5.3 MG, phiên bản tuyệt vời nhất chơi bóng trên sân cỏ nhân tạo hay tự nhiên. Puma Future 5.3 MG, món hàng được săn đón nhiều nhất trong năm', 1899000, 'TF, Cỏ nhân tạo', 0),
(41, 'Puma', 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black', 'Giày đá bóng Puma Ultra 1.1 FG/AG- Shocking Orange/ Black sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO độc quyền chế tạo', 5499000, 'Cỏ nhân tạo, AG, TF, Cỏ tự nhiên', 0),
(42, 'Puma', 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink', 'Puma Ultra 1.1 FG Turbo pack – Black/ Luminous Pink sản phẩm mới nhất nằm trong dòng giày Puma Ultra hoàn toàn mới, giày đá bóng Puma Ultra cực đẹp, dòng giày hoàn toàn mới hướng tới trọng lượng siêu nhẹ. Puma áp dụng công nghệ MATRYXEVO', 6000000, 'FG, Cỏ tự nhiên', 0),
(43, 'Adidas', 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo', 'Adidas Predator Edge .1 FG Sapphire Edge pack- Hi-res Blue/ Turbo màu xanh dương cực đẹp, nằm trong bộ sưu tập Sapphire Edge pack cực đẹp, là sản phẩm cao cấp nhất dành cho anh em có điều kiện, được sử dụng những công nghệ tân tiến nhất', 4999999, 'FG, Cỏ tự nhiên', 0),
(44, 'Mizuno', 'Mizuno Monarcida Neo II Select AS TF – Blue / White / Red', 'Mizuno Monarcida Neo II Select AS TF – Blue / White / Red giày bóng đá Mizuno chính hãng, upper làm từ da tổng hợp mềm mại, đế TF phù hợp với sân cỏ nhân tạo, cực kỳ phù hợp với phom chân bè, dễ đi dễ xỏ', 1399000, 'TF, Cỏ nhân tạo', 0),
(45, 'Mizuno', 'Mizuno Morelia Neo III Pro TF – Light Blue / White / Red', 'Mizuno Morelia Neo III Pro TF – Light Blue / White / Red giày bóng đá Mizuno chính hãng, upper làm từ da tổng hợp mềm mại, đế TF phù hợp với sân cỏ nhân tạo, cực kỳ phù hợp với phom chân bè, dễ đi dễ xỏ', 3050000, 'TF, Cỏ nhân tạo', 0),
(46, 'Mizuno', 'Mizuno Monarcida Neo Sala Club – White / Blue/ Red', 'Mizuno Monarcida Neo Sala Club – White / Blue/ Red giày đá bóng chính hãng Mizuno, sản phẩm đến từ Nhật Bản phù hợp với chân người Châu Á khi chiều chuộng được cả những anh em chơi chân to ngang, và cả những anh em chân thon', 1299000, 'TF, Cỏ nhân tạo', 0),
(47, 'Mizuno', 'Mizuno Morelia Neo KL II AS TF- Solar Yellow/ Deep Ocean', 'Mizuno Morelia Neo KL II AS TF- Solar Yellow/ Deep Ocean, giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, giày đá bóng Mizuno chính hãng, giày bóng đá Mizuno là thương hiệu đến từ Nhật Bản, ở Nhật thì dân họ chỉ dùng Mizuno', 2850000, 'TF, Cỏ nhân tạo', 0),
(48, 'Adidas', 'Kamito TA11 TF – Xanh lá/Vàng', 'Kamito TA11 TF – Xanh lá/Vàng, giày đá bóng chính hãng, model giày bóng đá tốt nhất ở phân khúc giá dưới 1 triệu đồng tại Việt Nam dành cho sân cỏ nhân tạo. Chỉ với một ngân sách vừa phải anh em có thể sắm được sản phẩm', 699000, 'TF, Cỏ nhân tạo', 0),
(49, 'Mizuno', 'Mizuno Morelia Neo III Pro AS TF – Core White / Volt / Light Pink', 'Mizuno Morelia Neo III Pro AS TF – Core White / Volt / Light Pink , giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, upper làm tư da tổng hợp, đế giày kiểu TF phù hợp với sân cỏ nhân tạo', 2999000, 'TF, Cỏ nhân tạo', 0),
(50, 'Adidas', 'Adidas Predator Freak .1 L FG Superspectral – Black/ White/ Shock Pink', 'Adidas Predator Freak .1 L FG Superspectral – Black/ White/ Shock Pink, giày đá bóng Adidas Predator Freak… Model giày đá bóng mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp', 2999000, 'FG, Cỏ tự nhiên', 0),
(51, 'Adidas', 'Adidas X Ghosted .1 FG Superspectral- Shock Pink/ Core Black/ Screaming Orange', 'Adidas X Ghosted .1 FG Superspectral- Shock Pink/ Core Black/ Screaming Orange , giày đá bóng siêu nhẹ dành cho sân cỏ tự nhiên, upper Fluroskin cực mềm mại, khung sườn kiểu SpeedFrame siêu nhẹ khiến trọng lượng chỉ dưới 200 gram/chiếc', 5000000, 'FG, Cỏ tự nhiên', 0),
(52, 'Adidas', 'Adidas Predator Freak + TF Meteorite- Solar Red/ Black/ White', 'Adidas Predator Freak + TF Meteorite- Solar Red/ Black/ White, giày đá bóng chính hãng, giày đá bóng không dây, giày đá bóng Adidas chính hãng, nằm trong bộ sưu tập giày Adidas Meteorite pack, giày đá bóng Adidas Predator Freak… Model giày đá bóng mới nhất', 4200000, 'FG, Cỏ tự nhiên', 0),
(53, 'Adidas', 'Adidas Predator Freak .3 L FG White Spark – Cloud White / Iron Metallic / Solar Red', 'Adidas Predator Freak .3 L FG White Spark – Cloud White / Iron Metallic / Solar Red mới nhất hướng tới một siêu giày kiểm soát bóng tối ưu, thiết kế cực đẹp và mang đầy đủ công nghệ đỉnh cao nhất. Đây là phiên bản thấp cổ, đế FG phù hợp chơi bóng trên sân cỏ tự nhiên. Upper có 2 lớp, bên trong là sợi và bên ngoài được phủ da tổng hợp. Dòng sản phẩm giày Adidas Predator Freak định hướng sử dụng cho các tiền vệ công thượng thừa như Pogba', 1900000, 'FG, Cỏ tự nhiên', 0),
(54, 'Nike', 'Nike Mercurial Superfly 8 Pro FG – Black/ Cyber/ Off Noir', 'Nike Mercurial Superfly 8 Pro FG – Black/ Cyber/ Off Noir', 4200000, 'FG, Cỏ tự nhiên', 0),
(55, 'Nike', 'Nike Phantom GT Academy Flyease FG/MG – Photo Blue/ Metallic Silver', 'Nike Phantom GT Academy Flyease FG/MG – Photo Blue/ Metallic Silver thấp cổ, giày Phantom GT cổ truyền thống… sản phẩm hoàn toàn mới, thiết kế trẻ trung và mạnh mẽ, ngoại thất cực đẹp… dòng giày Nike Phantom GT hướng tới lối chơi toàn diện, hỗ trợ khả năng rê bóng, chuyển bóng và sút bóng', 1700000, 'FG, Cỏ tự nhiên', 0),
(56, 'Adidas', 'Adidas Nemeziz .4 TF- Team Royal Blue/ Solar Yellow/ Core Black', 'Adidas Nemeziz .4 TF- Team Royal Blue/ Solar Yellow/ Core Black, giày đá bóng chính hãng, giày đá bóng sân cỏ nhân tạo, giày đá bóng Adidas chính hãng, giày đá bóng Adidas Nemeziz .4 TF, đế TF đá trên sân cỏ nhân tạo, upper làm từ da tổng hợp', 1800000, 'TF,Cỏ nhân tạo', 0),
(57, 'Adidas', 'Adidas Nemeziz 19.3 FG InFlight- Signal Coral/ Core Black/ Glory Red', 'Adidas Nemeziz 19.3 FG InFlight- Signal Coral/ Core Black/ Glory Red, nằm trong bộ sưu tập giày Adidas InFlight 2020 cực đẹp,  giày đá bóng chính hãng, giày Adidas Nemeziz 19.3 FG, upper làm từ sợi và da tổng hợp, đế giày kiểu FG phù hợp chơi bóng trên sân cỏ tự nhiên', 1400000, 'FG,Cỏ tự nhiên', 0);

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
-- Chỉ mục cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD KEY `fk_productdetails_products` (`productID`);

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

--
-- Các ràng buộc cho bảng `productdetails`
--
ALTER TABLE `productdetails`
  ADD CONSTRAINT `fk_productdetails_products` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
