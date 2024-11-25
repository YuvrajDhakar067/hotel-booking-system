// src/utils/email.js
import emailjs from "@emailjs/browser";

export const sendConfirmationEmail = (recipientEmail, booking) => {
  const serviceId = "service_9n8s00m"; 
  const templateId = "template_fall5zd";
  const userId = "2QgiuuqJ9D5prKz6r";

  const emailParams = {
    recipient_email: recipientEmail,
    room_type: booking.roomType,
    check_in: booking.checkIn,
    check_out: booking.checkOut,
    customer_name: booking.name,
  };

  return emailjs.send(serviceId, templateId, emailParams, userId);
};
