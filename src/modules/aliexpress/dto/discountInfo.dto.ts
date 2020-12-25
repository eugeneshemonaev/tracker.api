import { CrossCoupon } from './crossCoupon.dto';
import { ShopCoupon } from './shopCoupon.dto';
import { ShopFullPiece } from './shopFullPiece.dto';

export class DiscountInfo {
  crossCouponList?: CrossCoupon[];
  shopCouponList?: ShopCoupon[];
  shopFullPieceList?: ShopFullPiece[];
}
