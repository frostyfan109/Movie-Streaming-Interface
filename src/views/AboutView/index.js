import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WEBSITE_NAME, WEBSITE_URL } from '../../constants.js';

export default class AboutView extends Component {
  render() {
    return (
      <div className="About">
      </div>
    );
  }
}

export class PrivacyView extends Component {
  render() {
    return (
      <div className="Privacy">
      <h4>Welcome to our Privacy Policy</h4>
        <h5>Your privacy is critically important to us.</h5>
        Patker Technologies, Inc is located at:<br/>
        <address>
          Patker Technologies, Inc</address>

        <p>It is Patker Technologies, Inc's policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to <a href={WEBSITE_URL}>{WEBSITE_URL}</a> (hereinafter, "us", "we", or "{WEBSITE_URL}"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.</p>
        <p>This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.</p>

              <h5>Website Visitors</h5>
        <p>Like most website operators, Patker Technologies, Inc collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Patker Technologies, Inc's purpose in collecting non-personally identifying information is to better understand how Patker Technologies, Inc's visitors use its website. From time to time, Patker Technologies, Inc may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
        <p>Patker Technologies, Inc also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on {WEBSITE_URL} blog posts. Patker Technologies, Inc only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.</p>


              <h5>Security</h5>
        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>



              <h5>Links To External Sites</h5>
        <p>Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.</p>
        <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.</p>



              <h5>Aggregated Statistics</h5>
        <p>Patker Technologies, Inc may collect statistics about the behavior of visitors to its website. Patker Technologies, Inc may display this information publicly or provide it to others. However, Patker Technologies, Inc does not disclose your personally-identifying information.</p>


              <h5>Cookies</h5>
        <p>To enrich and perfect your online experience, Patker Technologies, Inc uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.</p>
        <p>A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Patker Technologies, Inc uses cookies to help Patker Technologies, Inc identify and track visitors, their usage of {WEBSITE_URL}, and their website access preferences. Patker Technologies, Inc visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Patker Technologies, Inc's websites, with the drawback that certain features of Patker Technologies, Inc's websites may not function properly without the aid of cookies.</p>
        <p>By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Patker Technologies, Inc's use of cookies.</p>



              <h5>Privacy Policy Changes</h5>
        <p>Although most changes are likely to be minor, Patker Technologies, Inc may change its Privacy Policy from time to time, and in Patker Technologies, Inc's sole discretion. Patker Technologies, Inc encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>



          <h5></h5>
            <p></p>

        <h5>Credit & Contact Information</h5>
        <p>This privacy policy was created at <a style={{color : "inherit", textDecoration : "none"}} href="https://termsandconditionstemplate.com/privacy-policy-generator/" title="Privacy policy template generator" target="_blank">termsandconditionstemplate.com</a>. If you have any questions about this Privacy Policy, please contact us via <a href="mailto:urnancx@gmail.com">email</a> or <a href="tel:9999999999">phone</a>.</p>
      </div>
    );
  }
}

export class TermsOfUseView extends Component {
  render() {
    return (
      <div className="Terms-Of-Use">
      <h4>Terms of Use ("Terms")</h4>


      <p>Last updated: August 25, 2019</p>


      <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the {WEBSITE_URL} website (the "Service") operated by {WEBSITE_NAME} ("us", "we", or "our").</p>

      <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>

      <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. The Terms of Use agreement  for {WEBSITE_NAME} has been created with the help of <a href="https://www.termsfeed.com/">TermsFeed</a>.</p>


      <h5>Accounts</h5>

      <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

      <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

      <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>


      <h5>Links To Other Web Sites</h5>

      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by {WEBSITE_NAME}.</p>

      <p>{WEBSITE_NAME} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that {WEBSITE_NAME} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

      <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>


      <h5>Termination</h5>

      <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

      <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

      <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>

      <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>


      <h5>Governing Law</h5>

      <p>These Terms shall be governed and construed in accordance with the laws of North Carolina, United States, without regard to its conflict of law provisions.</p>

      <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>


      <h5>Changes</h5>

      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

      <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>


      <h5>Contact Us</h5>

      <p>If you have any questions about these Terms, please contact us.</p>
      </div>
    );
  }
}
