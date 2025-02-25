import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mjkgqpjo");

  if (state.succeeded) {
    return <p className="text-center text-green-600">Thanks for your message! We’ll get back to you soon.</p>;
  }

  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>Contact Us</h2>
        <p className='mb-8 lg:md-16 font-light text-center text_para'>
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div>
            <label htmlFor="email" className='form_label'>
              Your Email
            </label>
            <input 
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="form_input mt-1"
              required
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          <div>
            <label htmlFor="subject" className='form_label'>
              Subject
            </label>
            <input 
              type="text"
              id="subject"
              name="subject"
              placeholder="Let us know how we can help you"
              className="form_input mt-1"
              required
            />
          </div>
          <div className='sm:col-span'>
            <label htmlFor="message" className='form_label'>
              Your Message
            </label>
            <textarea 
              rows="6"
              id="message"
              name="message"
              placeholder="Leave a comment...."
              className="form_input mt-1"
              required
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          <button type="submit" className='btn rounded sm:w-fit' disabled={state.submitting}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
