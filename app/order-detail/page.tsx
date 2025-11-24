export default function OrderDetail() {
  let status: couponStatus = "valid";
  return (
    <div className="flex flex-col items-center gap-10">
      <nav className="bg-blue-purple flex w-full items-center px-10 py-3">
        <a className="font-inter text-2xl font-bold text-white" href="#">
          Funbox.idn
        </a>
      </nav>

      <h1 className="font-inter text-blue-purple text-3xl font-bold sm:text-4xl md:text-5xl">
        Order Summary
      </h1>

      <div className="mb-2 flex min-h-10 w-10/12 flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <form
            action=""
            className="flex w-full flex-col gap-2 text-base sm:text-lg"
          >
            <label htmlFor="name" className="font-inter font-semibold">
              Nama
            </label>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Insert your name"
              className="rounded-md border border-[#D0D5DD] p-2 placeholder:text-[#D0D5DD]"
            />

            <label htmlFor="email" className="font-inter font-semibold">
              E-mail
            </label>
            <input
              type="email"
              name="name"
              id=""
              placeholder="Insert your email"
              className="rounded-md border border-[#D0D5DD] p-2 placeholder:text-[#D0D5DD]"
            />

            <label htmlFor="voucher" className="font-inter font-semibold">
              Voucher (if applicable)
            </label>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Insert voucher"
              className="rounded-md border border-[#D0D5DD] p-2 placeholder:text-[#D0D5DD]"
            />
            <label htmlFor="duration" className="font-inter font-semibold">
              Durasi
            </label>
            {/* <input name="duration" id="" /> */}

            <select
              name="duration"
              id="duration"
              className="rounded-md border border-[#D0D5DD] p-2 placeholder:text-[#D0D5DD]"
            >
              <option value="1">1 Jam</option>
              <option value="2">2 Jam</option>
              <option value="3">3 Jam</option>
              <option value="4">4 Jam</option>
            </select>
          </form>

          <div className="mt-3 flex justify-center md:justify-end">
            <button className="border-blue-purple text-blue-purple rounded-md border px-16 py-2 font-bold">
              Edit
            </button>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col md:w-6/12 md:max-w-full">
          <div className="text-inter border-blue-purple rounded-xl border p-5 text-base sm:p-8 sm:text-lg md:p-10">
            <div className="mb-2 flex w-full justify-between">
              <p>Date</p>
              <p>25 April 2025</p>
            </div>

            <div className="mb-5 flex w-full justify-between">
              <p>Time</p>
              <p>05:35 PM</p>
            </div>

            <div className="mb-2 flex w-full justify-between font-bold">
              <p>Produk</p>
              <p>Qty</p>
            </div>

            <div className="mb-5 flex w-full justify-between">
              <p>Pendaftaran</p>
              <p>1x</p>
            </div>

            <div className="mb-2 flex w-full justify-between">
              <p>Kode Voucher</p>
            </div>

            <Coupon status={status} />

            <div className="mb-2 flex w-full justify-between">
              <p>Subtotal</p>
              <p>150.000</p>
            </div>
            <div className="mb-5 flex w-full justify-between">
              <p>Subtotal Voucher</p>
              <p>-10.000</p>
            </div>

            <div className="mb-5 flex w-full justify-between font-bold">
              <p>Total</p>
              <p>140.000</p>
            </div>
          </div>

          <div className="mb-24 flex justify-center">
            <button className="bg-lavender font-inter mt-10 rounded-lg px-16 py-2 text-lg font-bold text-white">
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type couponStatus = "valid" | "invalid" | "unused";

interface CouponProps {
  status: couponStatus;
}

function Coupon({ status }: CouponProps) {
  const colormap = {
    valid: "border-green-success text-green-success",
    invalid: "border-red-500 text-red-500",
    unused: "border-[#D0D5DD] text-[#D0D5DD]",
  } as const;

  return (
    <div
      className={`mb-10 flex justify-end rounded-md border p-2 ${colormap[status]}`}
    >
      <p className="font-fira-code text-base sm:text-lg">
        {status == "valid"
          ? "COUPON APPLIED"
          : status == "invalid"
            ? "COUPON INVALID"
            : "NO COUPON INSERTED"}
      </p>
    </div>
  );
}
