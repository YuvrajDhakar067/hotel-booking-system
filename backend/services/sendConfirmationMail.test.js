import { sendConfirmationEmail } from './emailService'; // Adjust the import path
import emailjs from '@emailjs/browser';

jest.mock('@emailjs/browser'); // Mock emailjs-com module

describe('sendConfirmationEmail', () => {
  const mockBooking = {
    roomType: 'Deluxe',
    checkIn: '2024-12-01',
    checkOut: '2024-12-10',
    name: 'John Doe',
  };
  const recipientEmail = 'john.doe@example.com';

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should send an email with the correct parameters', async () => {
    // Mock the emailjs.send method to resolve successfully
    emailjs.send.mockResolvedValue({ message: 'OK' });

    // Call the sendConfirmationEmail function
    await sendConfirmationEmail(recipientEmail, mockBooking);

    // Verify if emailjs.send was called with the correct parameters
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_9n8s00m',  // serviceId
      'template_fall5zd',  // templateId
      {
        recipient_email: recipientEmail,
        room_type: mockBooking.roomType,
        check_in: mockBooking.checkIn,
        check_out: mockBooking.checkOut,
        customer_name: mockBooking.name,
      },
      '2QgiuuqJ9D5prKz6r' // userId
    );
  });

  it('should throw an error if the email sending fails', async () => {
    // Mock the emailjs.send method to reject with an error
    emailjs.send.mockRejectedValue(new Error('Failed to send email'));

    // Call the function and catch the error
    await expect(sendConfirmationEmail(recipientEmail, mockBooking)).rejects.toThrow('Failed to send email');
  });
});