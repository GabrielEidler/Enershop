jQuery(document).ready(function () {
    const consoleOutput = $(".console-output");

    let userResidencia = {
      equationScore: Number,
      footage: Number,
      city: String,
      monthyCost: String,
      type: String, // Casa ou Apartamento
      floors: String, // Nº de andares
    };
    let userCondominio = {
      equationScore: Number,
      footage: Number,
      city: String,
      monthlyCost: String,
      type: String, // Casas, Apartamentos ou Salas Comerciais
      units: Number, // Número de unidades
      voltage: String, // Alta,  Baixa (A ou B) ou Nãi sei (Null)
    };
    let userNegocio = {
      equationScore: Number,
      footage: Number,
      monthlyCost: String,
      type: String, // tipo de negócio, select field ou digitação
      locationAmount: Number, // Número de localizações
      locations: [String],
      voltage: String, // Alta,  Baixa (A ou B) ou Nãi sei (Null)
    };

    const residence_Recommendation_Calculator = (userObject) =>{
      //opções GDC, GDD, INSTALAÇÃO MANUAL, CONSULTORIA, PRODUTOS COMERCIAIS, PRODUTOS RESIDENCIAIS
     

      $('.recommendation-block').removeClass('hidden');

      if (userObject.equationScore < 9.8) {
        if (userObject.type === 'apartamento') {
          $('.residence_gdc-pr').removeClass('hidden');
        }else{
          $('.residence_gdc-s-pr').removeClass('hidden');
        }
      }else {
        if (userObject.type === 'apartamento') {
          $('.residence_gdc-pr').removeClass('hidden');
        }else{
          $('.residence_s-gdc-pr').removeClass('hidden');
        }

      }

      JSON.stringify(userObject);
    }

    const condo_Recommendation_Calculator = (userObject) =>{
      //opções GDC, GDD, INSTALAÇÃO MANUAL, CONSULTORIA, PRODUTOS COMERCIAIS, PRODUTOS RESIDENCIAIS
      
      $('.recommendation-block').removeClass('hidden');

      if (userObject.equationScore < 9.8) {
        if (userObject.voltage === 'a') {
          $('.residence_s-gdd-pr').removeClass('hidden');
        }else if (userObject.voltage === 'b'){

          $('.residence_gdc-s-pr').removeClass('hidden');

        }else if(userObject.voltage === 'none'){
          if(userObject.monthlyCost > 14999){
            $('.residence_s-gdd-pr').removeClass('hidden');
          }else{

            $('.residence_gdc-s-pr').removeClass('hidden');

          }
        }
      }else {
        if (userObject.voltage === 'a') {
          $('.residence_s-gdd-pr').removeClass('hidden');
        }else if (userObject.voltage === 'b'){

          $('.residence_s-gdc-pr').removeClass('hidden');

        }else if(userObject.voltage === 'none'){
          if(userObject.monthlyCost > 14999){
            $('.residence_s-gdd-pr').removeClass('hidden');
          }else{

            $('.residence_s-gdc-pr').removeClass('hidden');

          }
        }
      }

      JSON.stringify(userObject);
    }

    const quizzSystem = () => {
      let structureType = false;

      // FIRST FORM LISTENER
      $(".initial-form input").on("change", function () {
        structureType = Number(
          $("input[name=structure-type]:checked", ".initial-form").val()
        );

        $(".initial-form").hide();
        
          consoleOutput.text("");
          $('.button-previous').removeClass('hidden');
          if (structureType === 1) {
            $('.residence-form_block').removeClass('hidden')
            residence_start(); // setup residence question system
          } else if (structureType === 2) {
            $('.condo-form_block').removeClass('hidden')
            condoQuestions(); // setup condo question system
          } else if (structureType === 3) {
            $('.business-form_block').removeClass('hidden')
            businessQuestions(); // setup business question system
          }
      });

      // FIRST NEXT BUTTON
      const button_start = () => {
        
      };

      $(".button-next").bind("click", button_start);

      const businessQuestions = () => {
        console.log("business system start");
        let footage = 0;
        let address = '';
        let cost = 0;
        let type = '';
        let locationAmount = 0;
        let locations= [];
        let voltage = '';
        let question = 1;
        let tagCounter = 0;
        let tagButton = $('.business-address_tag');

        $(".business-question_1").show();
        $(".button-next").unbind("click", button_start);
        
        const button_business_5 = () => {

            if ( Number(cost) !== 0 ) 
            {
              
              consoleOutput.text("");
              console.log('cost: ',cost)
              let score = (cost / (footage / locationAmount));
              var roundedScore = Math.round((score + Number.EPSILON) * 100) / 100;

              userNegocio = {
                equationScore: roundedScore,
                footage: footage,
                monthyCost: cost,
                type: type, 
                locationAmount: locationAmount, 
                locations: locations,
                voltage: voltage
              }
              
              console.log('quizzObject', userNegocio)
              //business_Recommendation_Calculator(userNegocio);
              
              setTimeout(() => {
                $('.recommendation-load_mask').animate({
                  opacity: 0,
                }, 600, function(){
                  $('.recommendation-load_mask').addClass('hidden');
  
                })
              }, 3000);

              $('.business-form_block').addClass('hidden');

              JSON.stringify(userNegocio);

            } else {
              //
              consoleOutput.text("resposta 5/5 vazia");
            }
        };

        const button_business_4 = () => {
            address = $('.business-address').val();
            if ( address !== '' && locations.length > 0 ) 
            {
              console.log('locations', locations)

              // Hides initial question
              $(".business-question_4").hide();
              $(".business-question_5").show();
              $(".button-next").unbind("click", button_business_4);
              $(".button-next").bind("click", button_business_5);
              consoleOutput.text("");
              console.log('address: ',address)
              question = 5;
            } else {
              //
              consoleOutput.text("resposta 4/5 vazia");
            }
        };

        const button_business_3 = () => {
            if ( Number(locationAmount) !== 0 ) 
            {
              
              // Hides initial question
              $(".business-question_3").hide();
              $(".business-question_4").show();
              $(".button-next").unbind("click", button_business_3);
              $(".button-next").bind("click", button_business_4);
              consoleOutput.text("");
              console.log('locationAmount: ',locationAmount)
              question = 4;
            } else {
              //
              consoleOutput.text("resposta 3/5 vazia");
            }
        };

        const button_business_2 = () => {
            
            if ( Number(footage) !== 0 ) 
            {
              
              // hide current, show next
              $(".business-question_2").hide();
              $(".business-question_3").show();
              $(".button-next").unbind("click", button_business_2);
              $(".button-next").bind("click", button_business_3);

              consoleOutput.text("");
              

              console.log('footage: ',footage)
              question = 3;
            } else {
              //
              consoleOutput.text("resposta 2/5 vazia");
            }
            
        };

        const button_business_1 = () => {
          $(".button-next").unbind("click", button_start);
          if ( $(".business-type option:selected").val() ) 
          {
            
            // Hides initial question
            $(".business-question_1").hide();
            $(".business-question_2").show();
            $(".button-next").unbind("click", button_business_1);
            $(".button-next").bind("click", button_business_2);
            consoleOutput.text("");
            console.log($( ".business-type option:selected").val())
            question = 2;
            // call next question
          } else {
            //
            consoleOutput.text("resposta 1/5 vazia");
          }
          
        };
        $(".button-next").bind("click", button_business_1);

        // Back button
        $('.button-previous').click(()=>{
          $(".button-next").unbind("click", button_business_1);
          $(".button-next").unbind("click", button_business_2);
          $(".button-next").unbind("click", button_business_3);
          $(".button-next").unbind("click", button_business_4);
          $(".button-next").unbind("click", button_business_5);
          console.log('question before: ', question)
            switch (question) {
                case 1:
                    $(".business-question_1").hide();
                    $('.business-form_block').addClass('hidden')
                    $('input[name=structure-type]').prop('checked', false);
                    structureType = false;
                    $(".initial-form").show();
                    $(".button-next").bind("click", button_start);
                    question = 0;
                    break;
                case 2:
                    $(".business-question_2").hide();
                    $(".business-question_1").show();
                    $(".button-next").bind("click", button_business_1);
                    question = 1;
                    break;
                case 3:
                    $(".business-question_3").hide();
                    $(".business-question_2").show();
                    $(".button-next").bind("click", button_business_2);
                    question = 2;
                    break;
                case 4:
                    $(".business-question_4").hide();
                    $(".business-question_3").show();
                    $(".button-next").bind("click", button_business_3);
                    question = 3;
                    break;
                case 5:
                    $(".business-question_5").hide();
                    $(".business-question_4").show();
                    $(".button-next").bind("click", button_business_4);
                    question = 4;
                    break;
                case 6:
                    $(".button-next").bind("click", button_business_5);
                    question = 5;
                    break;
            
                default:
                    break;
            }
        })
        
        $('.business-address_plus-button').click(()=>{
          address = $('.business-address').val();
          if(address) locations.push(address);
          console.log ('address added: ', address)
          tagCounter = tagCounter + 1;

          if(tagCounter === 1 ){
            $('.business_address-tag_title').text(address);
          }else{
            tagButton.clone().appendTo('.business_address-tag_wrapper')

            $('.business-address_tag').each((index, element) => {
              $(element).find('.business_address-tag_title').text(locations[index]);
            });
          }
        })

        $('.business_address-tag_icon').click((e)=>{
          let clickedButton = $(e.target);
          clickedButton.parent().remove();
        })

        // FORM LISTENER
        $(".business-form input").on("change", () => {

          footage = $('.business-footage').val();

          address = $('.business-address').val();

          locationAmount = $('.business-locations').val();

          cost = $('.business-cost').val();

        });

        $('input[type=radio][name=business-type]').change(function() {
            type = $(
            "input[name=business-type]:checked",
            ".business-form"
            ).val();
        });

        $('input[type=radio][name=business-voltage]').change(function() {
          voltage = $(
          "input[name=business-voltage]:checked",
          ".business-form"
          ).val();
      });

      };


      // ------------ CONDO ------------- //

      const condoQuestions = () => {
        console.log("condo system start");
        let footage = 0;
        let address = '';
        let cost = 0;
        let type = '';
        let units = 0;
        let voltage = '';
        let question = 1;

        $(".condo-question_1").show();
        $(".button-next").unbind("click", button_start);
        
        const button_condo_5 = () => {
            
            if ( Number(cost) !== 0 ) 
            {
              
              consoleOutput.text("");
              console.log('cost: ',cost)
              let score = (cost / (footage / units));
              var roundedScore = Math.round((score + Number.EPSILON) * 100) / 100;

              userCondominio = {
                equationScore: roundedScore,
                footage: footage,
                city: address,
                monthyCost: cost,
                type: type, // Casa ou Apartamento
                units: units, // Nº de andares
                voltage: voltage
              }
              JSON.stringify(userCondominio)
              console.log('quizzObject', userCondominio)
              condo_Recommendation_Calculator(userCondominio);
              
              setTimeout(() => {
                $('.recommendation-load_mask').animate({
                  opacity: 0,
                }, 600, function(){
                  $('.recommendation-load_mask').addClass('hidden');
  
                })
              }, 3000);

              $('.condo-form_block').addClass('hidden');

            } else {
              //
              consoleOutput.text("resposta 5/5 vazia");
            }
        };

        const button_condo_4 = () => {
            address = $('.condo-address').val();
            if ( address !== '' ) 
            {
              
              // Hides initial question
              $(".condo-question_4").hide();
              $(".condo-question_5").show();
              $(".button-next").unbind("click", button_condo_4);
              $(".button-next").bind("click", button_condo_5);
              consoleOutput.text("");
              console.log('address: ',address)
              question = 5;
            } else {
              //
              consoleOutput.text("resposta 4/5 vazia");
            }
        };

        const button_condo_3 = () => {
            if ( Number(units) !== 0 ) 
            {
              
              // Hides initial question
              $(".condo-question_3").hide();
              $(".condo-question_4").show();
              $(".button-next").unbind("click", button_condo_3);
              $(".button-next").bind("click", button_condo_4);
              consoleOutput.text("");
              console.log('units: ',units)
              question = 4;
            } else {
              //
              consoleOutput.text("resposta 3/5 vazia");
            }
        };

        const button_condo_2 = () => {
            
            if ( Number(footage) !== 0 ) 
            {
              
              // hide current, show next
              $(".condo-question_2").hide();
              $(".condo-question_3").show();
              $(".button-next").unbind("click", button_condo_2);
              $(".button-next").bind("click", button_condo_3);

              consoleOutput.text("");
              

              console.log('footage: ',footage)
              question = 3;
            } else {
              //
              consoleOutput.text("resposta 2/5 vazia");
            }
            
        };

        const button_condo_1 = () => {
          $(".button-next").unbind("click", button_start);
          if ( $("input[name=condo-type]:checked", ".condo-form").val() ) 
          {
            
            // Hides initial question
            $(".condo-question_1").hide();
            $(".condo-question_2").show();
            $(".button-next").unbind("click", button_condo_1);
            $(".button-next").bind("click", button_condo_2);
            consoleOutput.text("");
            console.log($("input[name=condo-type]:checked", ".condo-form").val())
            question = 2;
            // call next question
          } else {
            //
            consoleOutput.text("resposta 1/5 vazia");
          }
          
        };
        $(".button-next").bind("click", button_condo_1);


        // Back button
        $('.button-previous').click(()=>{
          $(".button-next").unbind("click", button_condo_1);
          $(".button-next").unbind("click", button_condo_2);
          $(".button-next").unbind("click", button_condo_3);
          $(".button-next").unbind("click", button_condo_4);
          $(".button-next").unbind("click", button_condo_5);
          console.log('question before: ', question)
            switch (question) {
                case 1:
                    $(".condo-question_1").hide();
                    $('.condo-form_block').addClass('hidden')
                    $('input[name=structure-type]').prop('checked', false);
                    structureType = false;
                    $(".initial-form").show();
                    $(".button-next").bind("click", button_start);
                    question = 0;
                    break;
                case 2:
                    $(".condo-question_2").hide();
                    $(".condo-question_1").show();
                    $(".button-next").bind("click", button_condo_1);
                    question = 1;
                    break;
                case 3:
                    $(".condo-question_3").hide();
                    $(".condo-question_2").show();
                    $(".button-next").bind("click", button_condo_2);
                    question = 2;
                    break;
                case 4:
                    $(".condo-question_4").hide();
                    $(".condo-question_3").show();
                    $(".button-next").bind("click", button_condo_3);
                    question = 3;
                    break;
                case 5:
                    $(".condo-question_5").hide();
                    $(".condo-question_4").show();
                    $(".button-next").bind("click", button_condo_4);
                    question = 4;
                    break;
                case 6:
                    $(".button-next").bind("click", button_condo_5);
                    question = 5;
                    break;
            
                default:
                    break;
            }
        })

        // FORM LISTENER
        $(".condo-form input").on("change", () => {
          

          footage = $('.condo-footage').val();

          address = $('.address').val();

          units = $('.condo-units').val();

          cost = $('.condo-cost').val();

        });

        $('input[type=radio][name=condo-voltage]').change(function() {
            voltage = $(
            "input[name=condo-voltage]:checked",
            ".condo-form"
            ).val();
        });

        $('input[type=radio][name=condo-type]').change(function() {
          type = $(
          "input[name=condo-type]:checked",
          ".condo-form"
          ).val();
      });

      };

      
      // RESIDENCE GAME
      const residence_start = () => {
        let residenceType = false;
        let footage = 0;
        let question = 1;
        let floors = 0;
        let address = '';
        let cost = 0;

        console.log("residencia");
        $(".residence-question_1").show();
        $(".button-next").unbind("click", button_start);

        const button_residence_5 = () => {
            address = $('.address').val();
            if ( address !== '' ) 
            {
              
              consoleOutput.text("");
              console.log('cost: ',cost)
              //question = 6;
              let score = (cost / (footage / floors));
              var roundedScore = Math.round((score + Number.EPSILON) * 100) / 100;

              userResidencia = {
                equationScore: roundedScore,
                footage: footage,
                city: address,
                monthyCost: cost,
                type: residenceType, // Casa ou Apartamento
                floors: floors, // Nº de andares
              }
              JSON.stringify(userResidencia)
              console.log('quizzObject', userResidencia)
              $('.residence-form_block').addClass('hidden')
              residence_Recommendation_Calculator(userResidencia);

              setTimeout(() => {
                $('.recommendation-load_mask').animate({
                  opacity: 0,
                }, 600, function(){
                  $('.recommendation-load_mask').addClass('hidden');
  
                })
              }, 3000);

              
            } else {
              //
              consoleOutput.text("resposta 5/5 vazia");
            }
        };

        const button_residence_4 = () => {
            address = $('.address').val();
            if ( address !== '' ) 
            {
              
              // Hides initial question
              $(".residence-question_4").hide();
              $(".residence-question_5").show();
              $(".button-next").unbind("click", button_residence_4);
              $(".button-next").bind("click", button_residence_5);
              consoleOutput.text("");
              console.log('address: ',address)
              question = 5;
              $('.quizz_progress-bar_inner').css('width','100%');
              $('.progress-bar_text').text('5/5');
            } else {
              //
              consoleOutput.text("resposta 4/5 vazia");
            }
        };

        const button_residence_3 = () => {
            if ( Number(floors) !== 0 ) 
            {
              
              // Hides initial question
              $(".residence-question_3").hide();
              $(".residence-question_4").show();
              $(".button-next").unbind("click", button_residence_3);
              $(".button-next").bind("click", button_residence_4);
              consoleOutput.text("");
              console.log('floors: ',floors)
              question = 4;
              $('.quizz_progress-bar_inner').css('width','80%');
              $('.progress-bar_text').text('4/5');
            } else {
              //
              consoleOutput.text("resposta 3/5 vazia");
            }
        };


        const button_residence_2 = () => {
            
          if ( Number(footage) !== 0 ) 
          {
            
            // hide current, show next
            $(".residence-question_2").hide();
            $(".residence-question_3").show();
            $(".button-next").unbind("click", button_residence_2);
            $(".button-next").bind("click", button_residence_3);

            consoleOutput.text("");
            console.log('footage: ',footage)
            question = 3;
            $('.quizz_progress-bar_inner').css('width','60%');
            $('.progress-bar_text').text('3/5');
          } else {
            //
            consoleOutput.text("resposta 2/5 vazia");
          }
          
        };

        const button_residence_1 = () => {
          $(".button-next").unbind("click", button_start);
          if ( $("input[name=residence-type]:checked", ".residence-form").val() ) 
          {
            
            // Hides initial question
            $(".residence-question_1").hide();
            $(".residence-question_2").show();
            $(".button-next").unbind("click", button_residence_1);
            $(".button-next").bind("click", button_residence_2);
            consoleOutput.text("");
            console.log($("input[name=residence-type]:checked", ".residence-form").val())
            question = 2;
            $('.quizz_progress-bar_inner').css('width','40%');
            $('.progress-bar_text').text('2/5');
            // call next question
          } else {
            //
            consoleOutput.text("resposta 1/5 vazia");
          }
          
        };
        $(".button-next").bind("click", button_residence_1);


        // Back button
        $('.button-previous').click(()=>{
          $(".button-next").unbind("click", button_residence_1);
          $(".button-next").unbind("click", button_residence_2);
          $(".button-next").unbind("click", button_residence_3);
          $(".button-next").unbind("click", button_residence_4);
          $(".button-next").unbind("click", button_residence_5);
          console.log('question before: ', question)
            switch (question) {
                case 1:
                    $(".residence-question_1").hide();
                    $('.residence-form_block').addClass('hidden')
                    $('input[name=structure-type]').prop('checked', false);
                    structureType = false;
                    $(".initial-form").show();
                    $(".button-next").bind("click", button_start);
                    question = 0;
                    break;
                case 2:
                    $(".residence-question_2").hide();
                    $(".residence-question_1").show();
                    $(".button-next").bind("click", button_residence_1);
                    question = 1;
                    break;
                case 3:
                    $(".residence-question_3").hide();
                    $(".residence-question_2").show();
                    $(".button-next").bind("click", button_residence_2);
                    question = 2;
                    break;
                case 4:
                    $(".residence-question_4").hide();
                    $(".residence-question_3").show();
                    $(".button-next").bind("click", button_residence_3);
                    question = 3;
                    break;
                case 5:
                    $(".residence-question_5").hide();
                    $(".residence-question_4").show();
                    $(".button-next").bind("click", button_residence_4);
                    question = 4;
                    break;
                case 6:
                    $(".button-next").bind("click", button_residence_5);
                    question = 5;
                    break;
            
                default:
                    break;
            }
        })
        
        // listener for 1 and 2
        $(".residence-form input").on("change", () => {
          residenceType = $(
            "input[name=residence-type]:checked",
            ".residence-form"
          ).val();

          footage = $('.footage').val();

          address = $('.condo-address').val();

          cost = $('.cost').val();

        });

        // listener for 3
        $('input[type=radio][name=floors]').change(function() {
            floors = $(
            "input[name=floors]:checked",
            ".residence-form"
            ).val();
        });
                    
      };

      
    };

    //system init
    quizzSystem();
  });