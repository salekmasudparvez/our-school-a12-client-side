import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../Hook/useAuth";
import PropTypes from 'prop-types'; // Correct import for PropTypes

const CheckoutForm = ({ session,refetch }) => {
    const { SessionTitle, TutorName, SessionDescription, RegistrationStartDate, RegistrationEndDate, ClassStartDate, ClassEndDate, SessionDuration, RegistrationFee, _id } = session || {};
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = RegistrationFee;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const paymentIntent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/create-payment-intent', { price: totalPrice });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
                setError('Failed to fetch payment details. Please try again later.');
            }
        };

        paymentIntent();
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            setLoading(false)
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setLoading(false)
            return;
        }

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (error) {
                console.error('Error confirming payment:', error);
                setLoading(false)
                setError(error.message || 'Payment failed. Please try again.');
            } else {
                if (paymentIntent.status === 'succeeded') {
                    setTransactionId(paymentIntent.id);

                    const payment = {
                        session: {
                            SessionTitle,
                            TutorName,
                            SessionDescription,
                            RegistrationStartDate,
                            RegistrationEndDate,
                            ClassStartDate,
                            ClassEndDate,
                            SessionDuration,
                            RegistrationFee,
                            BookId: _id,
                            studentEmail: user?.email,
                        },
                        bill: {
                            name: user.displayName,
                            email: user.email,
                            price: totalPrice,
                            transactionId: paymentIntent.id,
                            date: new Date(),
                            status: 'pending'
                        }
                    };

                    const res = await axios.post('http://localhost:5000/payments', payment);
                    console.log('Payment saved:', res.data);

                    if (res.data?.paymentResult?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Thank you for the payment!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            setError('Payment failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm rounded btn-outline hover:bg-sky-500 btn-block my-4" type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

CheckoutForm.propTypes = {
    session: PropTypes.object.isRequired,
};

export default CheckoutForm;
