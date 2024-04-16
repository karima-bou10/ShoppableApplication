<script setup>
     

    const dataSteps ={
        steps : ['Select Image','Add Tags','Save'],
        currentStep : 1,
        activeColor:'#476FFE',
        passiveColor :'#8A8A8A',
    };
</script>
<template>
    <StepProgress :data="dataSteps"/>
</template>