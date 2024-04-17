import React from 'react'
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './payment.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function Payment() {

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [cart, setCart] = useState({});
    const [loading, setLoading]= useState(false);
    const params = useParams();
   

    const navigate = useNavigate();

      //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users/braintree/token");                 
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    const courseId = params.courseId;
    axios.get("http://localhost:3000/users/courses/" + courseId, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setCart(res.data);
       
    });
}

  useEffect(() => {
    getToken();
    getCourse();
  }, []);

   //handle payments
   const handlePayment = async () => {
    try {
      setLoading(true);

      const { nonce } = await instance.requestPaymentMethod();        
      
      await axios.post("http://localhost:3000/users/braintree/payment", {
        nonce,
        cart,
      }, {
        headers : {
            'Content-Type': 'application/json',
            'authorization' : "Bearer " + localStorage.getItem("token"),
        }
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart({});
      navigate("/users/mycourses");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  return (
    <div style={{
      display: "flex",
      justifyContent : "center",
      marginTop: "100px",
    }}>
    <Card sx={{ minWidth: 280  }} style = {{
      width : "51%",
    }}>
    <CardContent>
    {!clientToken ? (
        ""
    ) : (
        <div>
        <div className="head">
        Total amount you have to pay for the for the {cart.title} course: ${cart.price} 
        </div>
            <DropIn
                options={{
                    authorization: clientToken,
                    paypal: {
                        flow: "vault",
                    },
                }}
                onInstance={(instance) => setInstance(instance)}
            />
            <div style={{display: "flex", justifyContent: "center"}}>
            <button
                className={`payment-button ${loading || !instance ? 'disabled' : ''}`}
                onClick={handlePayment}
                disabled={loading || !instance}
            >
                {loading ? "Processing ...." : "Make Payment"}
            </button>
            </div>
        </div>
    )}
   </CardContent>
    </Card></div>

  )
}

export default Payment