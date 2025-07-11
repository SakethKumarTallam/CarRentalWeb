// import { Col, Row, Divider, DatePicker, Checkbox, Modal, message } from "antd";
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DefaultLayout from "../components/DefaultLayout";
// import Spinner from "../components/Spinner";
// import { getAllCars } from "../redux/actions/carsActions";
// import moment from "moment";
// import { bookCar } from "../redux/actions/bookingActions";
// import AOS from 'aos';
// import { useLoaderData } from "react-router-dom";
// import 'aos/dist/aos.css';

// const { RangePicker } = DatePicker;

// function BookingCar() {
//   const car = useLoaderData();
//   const { loading } = useSelector((state) => state.alertsReducer);
//   const dispatch = useDispatch();
//   const [from, setFrom] = useState();
//   const [to, setTo] = useState();
//   const [totalHours, setTotalHours] = useState(0);
//   const [driver, setDriver] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(false);

//   useEffect(() => {
//     setTotalAmount(totalHours * car.rentPerHour);
//     if (driver) {
//       setTotalAmount(totalAmount + 30 * totalHours);
//     }
//   }, [driver, totalHours]);

//   // function selectTimeSlots(values) {
//   //   setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
//   //   setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

//   //   setTotalHours(values[1].diff(values[0], "hours"));
//   // }
//   function selectTimeSlots(values) {
//     setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
//     setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
//     setTotalHours(values[1].diff(values[0], "hours"));
//   }

//   function handleBooking() {
//     const reqObj = {
//       user: JSON.parse(localStorage.getItem('user'))._id,
//       car: car.name,
//       carImageUrl: car.image,
//       totalHours,
//       totalAmount,
//       driverRequired: driver,
//       bookedTimeSlots: {
//         from,
//         to,
//       },
//       rentPerHour: car.rentPerHour,
//     };

//     // Dispatch the bookCar action
//     dispatch(bookCar(reqObj));
//     setBookingSuccess(true);
//     message.success('Your booking is successful!');
//   }

//   return (
//     <DefaultLayout>
//       {loading && <Spinner />}
//       <Row
//         justify="center"
//         className="d-flex align-items-center"
//         style={{ minHeight: "90vh" }}
//       >
//         <Col lg={10} sm={24} xs={24} className='p-3'>
//           <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
//         </Col>

//         <Col lg={10} sm={24} xs={24} className="text-right">
//           <Divider type="horizontal" dashed>
//             Car Info
//           </Divider>
//           <div style={{ textAlign: "right" }}>
//             <p>{car.name}</p>
//             <p>{car.rentPerHour} Rent Per hour /-</p>
//             <p>Fuel Type : {car.fuelType}</p>
//             <p>Max Persons : {car.capacity}</p>
//           </div>

//           <Divider type="horizontal" dashed>
//             Select Time Slots
//           </Divider>
//           <RangePicker
//             showTime={{ format: "HH:mm" }}
//             format="MMM DD yyyy HH:mm"
//             onChange={selectTimeSlots}
//           />
//           <br />
//           {/* <button
//             className="btn1 mt-2"
//             onClick={() => {
//               setShowModal(true);
//             }}
//           >
//             See Booked Slots
//           </button> */}
//           {from && to && (
//             <div>
//               <p>
//                 Total Hours : <b>{totalHours}</b>
//               </p>
//               <p>
//                 Rent Per Hour : <b>{car.rentPerHour}</b>
//               </p>
//               <Checkbox
//                 onChange={(e) => {
//                   setDriver(e.target.checked);
//                 }}
//               >
//                 Driver Required
//               </Checkbox>

//               <h3>Total Amount : {totalAmount}</h3>

//               {!bookingSuccess && (
//                 <button className="btn1" onClick={handleBooking}>
//                   Book Now
//                 </button>
//               )}
//               {bookingSuccess && (
//                 <div>
//                   <h3>Your booking is successful!</h3>
//                   <p>View your bookings in My Bookings section.</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </Col>

//         {car.name && (
//           <Modal
//             visible={showModal}
//             closable={false}
//             footer={false}
//             title="Booked time slots"
//           >
//             <div className="p-2">
//               {car.bookedTimeSlots.map((slot) => (
//                 <button className="btn1 mt-2" key={slot.from}>
//                   {slot.from} - {slot.to}
//                 </button>
//               ))}

//               <div className="text-right mt-5">
//                 <button
//                   className="btn1"
//                   onClick={() => {
//                     setShowModal(false);
//                   }}
//                 >
//                   CLOSE
//                 </button>
//               </div>
//             </div>
//           </Modal>
//         )}
//       </Row>
//     </DefaultLayout>
//   );
// }

// export default BookingCar;

import {
  Col,
  Row,
  Divider,
  DatePicker,
  Checkbox,
  message
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import AOS from "aos";
import { useLoaderData } from "react-router-dom";
import "aos/dist/aos.css";

const { RangePicker } = DatePicker;

function BookingCar() {
  const car = useLoaderData();
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [flip, setFlip] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      AOS.init({ once: false });
    }, 0);
  }, []);

  useEffect(() => {
    if (!car) return;
    let amount = totalHours * car.rentPerHour;
    if (driver) {
      amount += 30 * totalHours;
    }
    setTotalAmount(amount);
  }, [driver, totalHours, car]);

  function selectTimeSlots(values) {
    const [start, end] = values;
    setFrom(start.toISOString());
    setTo(end.toISOString());
    setTotalHours(end.diff(start, "hours"));
  }

  function handleBooking() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !car || !from || !to) {
      message.error("Please select all required fields.");
      return;
    }

    const reqObj = {
      user: user._id,
      car: car.name,
      carImageUrl: car.image,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      },
      rentPerHour: car.rentPerHour
    };

    dispatch(bookCar(reqObj));

    setFlip(true);

    setTimeout(() => {
      setBookingSuccess(true);
      message.success("Your booking is successful!");
      setFrom(null);
      setTo(null);
      setTotalHours(0);
      setDriver(false);
      setTotalAmount(0);
      setFlip(false);
    }, 1000);
  }

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >

        <Col lg={10} sm={24} xs={24} className="p-3">
          <div
            data-aos={flip ? "flip-left" : ""}
            data-aos-duration="1000"
            style={{ perspective: "1000px" }}
            key={flip ? "flipped" : "unflipped"}
          >
            <img
              src={car.image}
              alt={car.name}
              className="carimg2 bs1"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                backfaceVisibility: "hidden",
                transition: "transform 0.6s"
              }}
            />
          </div>
        </Col>


        <Col lg={10} sm={24} xs={24} className="p-3">


          {/* <Divider type="horizontal" >
            <h2 style={{ marginBottom: 0 }}>Car Details</h2>
          </Divider> */}

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
              marginBottom: "24px",
              border: "1px solid #e6f0ff"
            }}
          >
            <h2
              style={{
                marginBottom: "16px",
                fontWeight: "600",
                fontSize: "24px",
                color: "#002766"
              }}
            >
              {car.name}
            </h2>

            <div style={{ fontSize: "16px", lineHeight: "28px", color: "#444" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Rent Per Hour:</strong> ₹{car.rentPerHour}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Capacity:</strong> {car.capacity} Persons
              </p>
            </div>
          </div>


          <Divider type="horizontal" dashed>
            <h4 style={{ marginBottom: 0 }}>Booking</h4>
          </Divider>

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
            value={from && to ? [moment(from), moment(to)] : null}
            className="mb-3"
          />

          <Checkbox
            onChange={(e) => setDriver(e.target.checked)}
            checked={driver}
            className="mb-3"
          >
            Driver Required (+₹30/hr)
          </Checkbox>

          {totalHours > 0 && (
            <>
              <p><strong>Total Hours:</strong> {totalHours}</p>
              <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
            </>
          )}

          <button
            className="btn1"
            onClick={handleBooking}
            style={{
              marginTop: "10px",
              backgroundColor: "#1890ff",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Book Now
          </button>

          {bookingSuccess && (
            <div style={{ marginTop: "20px" }}>
              <h3>Booking Successful!</h3>
              <p>Check “My Bookings” to view your reservation.</p>
            </div>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;

