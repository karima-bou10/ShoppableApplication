<script setup>
    import { defineProps, computed ,defineExpose ,ref} from 'vue';

// Define props
const props = defineProps({
    data: Object,
});
const data = ref(props.data);


// Computed property for cssStyle
const cssStyle = computed(() => {
    return {
        '--active-color': data.value.activeColor,
        '--passive-color': data.value.passiveColor,
    };
});

// Function to go to the next step
const nextStep = () => {
    if (data.value.currentStep < data.value.steps.length ) {
        data.value.currentStep++;
    }
};

// Function to go to the previous step
const previousStep = () => {
    if (data.value.currentStep > 0) {
        data.value.currentStep--;
    }
};
defineExpose({
        nextStep,
        previousStep,
    });
</script>
<template>
    <div class="steps-container" :style="cssStyle">
        <ul class="steps-list">
            <li class="step" v-for="(step,index) in data.steps" :key="index" 
            :class="{ 'step-active': index == data.currentStep , 'step-done': index < data.currentStep }">
                <div class="step-bubble">
                    <div class="step-count">{{ index + 1 }}
                    </div>
                </div>
                <div class="step-name">
                    <div class="step-count-name">{{ step }}
                    </div>
                </div>
                <div class="step-line">
                    <div class="line-fill">

                    </div>
                </div>
                
            </li>
        </ul>
        
    </div>
    
</template>

<style scoped>
    .steps-container {
        width : 100%;
        margin : 0 auto;
        padding: 30px;
    }
    .steps-list{
        display : flex ;
        list-style: none;
        position: relative; /* Set the position to relative for responsive steps */
        padding-left: 0; /* Remove default padding */
    }
    .step {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 100%;
        position: relative;
        height: 60px;
    }
    .step:last-child {
        max-width: 10%;
        right: 0px;
    }
    .step-bubble {
        width: 35px ;
        height: 35px;
        border-radius:50% ;
        background-color: var(--passive-color);
        transition: all .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .step-line {
        width: 60%;
        height: 2px;
        background-color: var(--passive-color);
        position: absolute;
        top:50%;
        left: 35%;
        transform: translateY(-50%);
        
    }
    .step-name {
        color: var(--passive-color);
        position: absolute;
        top:50%;
        left: 40px;
        transform: translateY(-50%);
        
    }
    .step-done .step-name {
        color: var(--active-color);
    }
    .line-fill {
        width: 0;
        height: 2px;
        background-color: var(--active-color);
        transition: all .3s ease;
        z-index: 3;
    }
    .step:last-child .step-line {
        display: none;
    }
    .step-active .step-count {
        display: block;
    }
    .step-active .step-bubble ,

    .step-done .step-bubble {
        background-color: var(--active-color);

    }
    .step-active .step-line {
        background-color: var(--active-color);
    }
    .step-active .step-name {
        color: var(--active-color);
    }

    .step-done .line-fill {
        width:100%;
    }

    .step-count {
        color :white;
        font-weight: 500;
        font-size: 20px;
        display: none;
        z-index: 500;
    }
    
  /* Responsive styles */
@media screen and (max-width: 768px) {
    .steps-list {
        flex-direction: column; /* Align steps vertically */
    }

    .step {
        max-width: 100%; /* Ensure each step takes full width */
        height: auto; /* Adjust height to fit content */
        margin-bottom: 20px; /* Add margin between steps */
    }

    .step-line {
        display: none;
    }

    .step-name {
        position: absolute; /* Reset position */
        top: auto;
        transform: none;
        text-align: center; /* Center step name */
        margin-top: 10px; /* Add margin for better spacing */
        margin-left: 15px;

    }
    .step:last-child {
        max-width: 100%;
        right: 0px;
    }
}
</style>