import jalaali from "jalaali-js";

export default function JalaliDate({ gregorianDate }) {
  // استخراج تاریخ بدون زمان
  const [year, month, day] = gregorianDate.split(" ")[0].split("-");

  const { jy, jm, jd } = jalaali.toJalaali(
    parseInt(year),
    parseInt(month),
    parseInt(day)
  );

  return (
    <span>
      {jy}/{jm.toString().padStart(2, "0")}/{jd.toString().padStart(2, "0")}
    </span>
  );
}