<template>
  <!-- @submit.prevent - data is submited when button is clicked without a page refresh -->
  <form @submit.prevent="submitForm" class="form-data">
    <div class="input-data">
      <div class="login-data" v-if="message === 'Log In'">
        <input
          type="username"
          class="form-control"
          id="inputCredentials"
          @input="validateCredentials()"
          placeholder="Username or email"
          v-model="username.value"
        />
        <p v-if="!username.isValid">{{ username.errorMsg }}</p>
      </div>
      <div class="login-data" v-else>
        <input
          type="username"
          class="form-control"
          :class="{ invalid: !username.isValid }"
          id="inputUsername"
          @input="validateUserName()"
          placeholder="Username"
          v-model="username.value"
        />
        <p v-if="!username.isValid">{{ username.errorMsg }}</p>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          :class="{ invalid: !email.isValid }"
          @input="validateEmail()"
          placeholder="Email"
          v-model.trim="email.value"
        />
        <p v-if="!email.isValid">{{ email.errorMsg }}</p>
      </div>
      <input
        type="password"
        class="form-control"
        id="inputPassword"
        :class="{ invalid: !password.isValid }"
        @input="validatePassword()"
        placeholder="Password"
        v-model="password.value"
      />
      <p v-if="!password.isValid">{{ password.errorMsg }}</p>
      <div class="login-data" v-if="message === 'Register'">
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          :class="{ invalid: !confirmPassword.isValid }"
          @input="validateConfirmPassword()"
          placeholder="Confirm password"
          v-model="confirmPassword.value"
        />
        <p v-if="!confirmPassword.isValid">{{ confirmPassword.errorMsg }}</p>
      </div>
      <div class="last-message">
        <p v-if="!formIsValid">
          Please fix the above errors and then submit again.
        </p>
      </div>
    </div>
    <ButtonComponent
      :isBtn="true"
      btnClass="btn btn-dark btn-lg"
      :message="message"
    />
  </form>
</template>
<script>
import ButtonComponent from "../components/ButtonComponent.vue";
const validator = require("validator");

export default {
  components: {
    ButtonComponent,
  },
  // sending the form data to the parent component vie emit-event conception
  emits: ["export-data"],
  data() {
    return {
      // make all inputs objects - with properties: value, isValid, because when implementing form
      //validation I will need to store a bool flag if the input is valid or not
      username: {
        value: "",
        isValid: true,
        errorMsg: "",
      },
      email: {
        value: "",
        isValid: true,
        errorMsg: "",
      },
      password: {
        value: "",
        isValid: true,
        errorMsg: "",
      },
      confirmPassword: {
        value: "",
        isValid: true,
        errorMsg: "",
      },
      // Add boolean flag that will be used to do basic form validation
      formIsValid: true,
    };
  },
  props: {
    message: {
      type: String,
      requred: true,
      default: "Log In",
    },
  },
  methods: {
    changeInputValidity(input, state) {
      this[input].isValid = state;
    },
    setInputErrorMsg(input, msg) {
      this[input].errorMsg = msg;
    },
    // Vlaidate inputs and if there is an eror save it in errMsg and display it in the input <p>
    validateUserName() {
      if (!this.username.value.trim()) {
        this.changeInputValidity("username", false);
        this.setInputErrorMsg(
          "username",
          "Username must contain at least one symbol. White spaces do not count."
        );
        return false;
      } else {
        if (!this.username.isValid) {
          this.changeInputValidity("username", true);
        }
        return true;
      }
    },
    validateCredentials() {
      if (!this.username.value.trim()) {
        this.changeInputValidity("username", false);
        this.setInputErrorMsg("username", "Enter valid username or email.");
        return false;
      } else {
        if (!this.username.isValid) {
          this.changeInputValidity("username", true);
        }
        return true;
      }
    },
    validateEmail() {
      if (!validator.isEmail(this.email.value)) {
        this.changeInputValidity("email", false);
        this.setInputErrorMsg("email", "Please provide correct email.");
      } else {
        if (!this.email.isValid) {
          this.changeInputValidity("email", true);
        }
        return true;
      }
      return false;
    },
    validatePassword() {
      if (this.password.value.length < 8) {
        this.changeInputValidity("password", false);
        this.setInputErrorMsg(
          "password",
          "Please enter at least 8 characters."
        );
      } else {
        if (!this.password.isValid) {
          this.changeInputValidity("password", true);
        }
        return true;
      }
      return false;
    },
    validateConfirmPassword() {
      if (
        this.confirmPassword.value !== this.password.value ||
        !this.confirmPassword.value
      ) {
        this.changeInputValidity("confirmPassword", false);
        this.setInputErrorMsg("confirmPassword", "Passwords are not matching.");
      } else {
        if (!this.confirmPassword.isValid) {
          this.changeInputValidity("confirmPassword", true);
        }
        return true;
      }
      return false;
    },
    validateForm() {
      // Reset validation rule to true if it was previously false
      this.formIsValid = true;

      //check if all inputs are valid
      if (this.message == "Register") {
        let isValidName = this.validateUserName();
        let isValidEmail = this.validateEmail();
        let isValidPassword = this.validatePassword();
        let isValidConfirmPassword = this.validateConfirmPassword();
        if (
          !isValidName ||
          !isValidEmail ||
          !isValidPassword ||
          !isValidConfirmPassword
        ) {
          this.formIsValid = false;
        }
      } else {
        let isValidCredentials = this.validatePassword();
        let isValidPassword = this.validateCredentials();
        if (!isValidCredentials || !isValidPassword) {
          this.formIsValid = false;
        }
      }
    },
    submitForm() {
      this.validateForm();
      // Check if form is valid
      if (!this.formIsValid) {
        return;
      }

      let username = this.username.value;
      let email = this.email.value;
      if (this.message === "Log In") {
        if (validator.isEmail(username.trim().toLowerCase())) {
          //if the input is email then trim the result and set characters to lowercase and set up username.value to null
          email = this.username.value.trim().toLowerCase();
          username = null;
        } else {
          // else set email to null.
          email = null;
        }
      }

      const formData = {
        username: username,
        email: email,
        password: this.password.value,
      };
      return this.$emit("export-data", formData);
    },
  },
};
</script>

<style scoped>
p {
  text-align: left;
  font-size: small;
  color: red;
  margin-left: 2%;
}
.last-message p {
  margin-top: 5px;
  text-align: center;
}
form {
  display: inline-block;
  margin-top: 3%;
  margin-left: 35%;
  margin-right: 35%;
  margin-bottom: 2%;
  width: 30%;
  text-align: center;
}
.input-data {
  margin-bottom: 45px;
}
.form-data .form-control {
  margin-top: 7%;
  background: #eef6fb;
  border: 1px solid #d9e4f5;
  box-sizing: border-box;
  border-radius: 70px;
}
.form-data .form-control.invalid {
  border: 1px solid red;
}
</style>