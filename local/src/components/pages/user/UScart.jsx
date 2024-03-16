import { Link } from 'react-router-dom'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function UScart() {
  return (
    <>
      <div className=" position-relative mt-5 ">
        <h3 className=" m-3">
          <span>We Live</span>
          <span className=" text-success ms-2">
            | ตระกร้าสินค้าของคุณ
            <ShoppingCartIcon />
          </span>
        </h3>
      </div>
      <table className="table">
        <thead></thead>
      </table>
      <div className="card mt-5 mx-auto p-4 rounded">
        <div className="text-center">
          <button className="text-white btn btn-success btn-sm">
            ไปหน้าชำระเงิน
          </button>
        </div>
      </div>

      <div className=" align-items-center text-center mt-3">
        <Link
          to="/user/home"
          className="btn btn-sm btn-outline-light text-dark border-3 border-primary text-center  "
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </>
  )
}
