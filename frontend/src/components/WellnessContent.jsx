import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { quizData } from './quizData';
import QuizGame from './QuizGame';

const NutritionModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">Understanding Nutrition</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Nutrition is the study of nutrients in food, how the body uses them, and the relationship between diet, health, and disease. It involves understanding how our bodies break down food (catabolism) and how they repair and create cells and tissues (anabolism). In short, nutrition is about eating a healthy and balanced diet so your body gets the nutrients it needs.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Macronutrients</h3>
            <p>Macronutrients are the nutrients we need in larger quantities that provide us with energy. The three macronutrients are carbohydrates, proteins, and fats.</p>
            <ul>
                <li><strong>Carbohydrates:</strong> They are the body's main source of energy. Found in foods like bread, rice, potatoes, and fruits. It's important to choose complex carbohydrates (like whole grains) over simple ones (like sugar).</li>
                <li><strong>Proteins:</strong> Essential for building and repairing tissues, making enzymes and hormones. Good sources include meat, fish, eggs, dairy products, legumes, and nuts.</li>
                <li><strong>Fats:</strong> A crucial source of energy and essential for absorbing certain vitamins. Healthy fats are found in avocados, nuts, seeds, and olive oil. It's best to limit saturated and trans fats.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Micronutrients</h3>
            <p>Micronutrients are the vitamins and minerals needed by the body in small amounts. They are crucial for development, disease prevention, and wellbeing.</p>
            <ul>
                <li><strong>Vitamins:</strong> Organic substances that are essential for normal cell function, growth, and development. There are 13 essential vitamins, including Vitamin A, C, D, E, K, and the B vitamins.</li>
                <li><strong>Minerals:</strong> Inorganic elements that play a vital role in various bodily functions. Key minerals include calcium, potassium, sodium, iron, and magnesium.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Creating a Balanced Diet</h3>
            <p>A balanced diet focuses on providing all the nutrients your body needs. The "MyPlate" model is a good guide:</p>
            <ul>
                <li><strong>Half your plate fruits and vegetables:</strong> Focus on whole fruits and vary your veggies.</li>
                <li><strong>Half your grains whole grains:</strong> Look for "100% whole grain" on the label.</li>
                <li><strong>Vary your protein routine:</strong> Mix up your protein foods to include seafood, lean meats, poultry, eggs, legumes, nuts, seeds, and soy products.</li>
                <li><strong>Move to low-fat or fat-free dairy or yogurt.</strong></li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Importance of Hydration</h3>
            <p>
                Water is essential for life. It regulates body temperature, lubricates joints, and helps transport nutrients. Aim to drink plenty of water throughout the day. The amount you need depends on various factors including your age, sex, and activity level.
            </p>
        </div>
    </>
);

const PhysicalHealthModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">Embracing Physical Health</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Physical health is the well-being of the body and the proper functioning of the organism. It is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity. Regular physical activity, a balanced diet, and adequate rest are the cornerstones of good physical health.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Pillars of Physical Activity</h3>
            <p>A well-rounded fitness program includes different types of exercises. Each type has its own benefits.</p>
            <ul>
                <li><strong>Aerobic Exercise (Cardio):</strong> This is any activity that gets your heart rate up. It improves cardiovascular health. Examples include brisk walking, running, swimming, and cycling. Aim for at least 150 minutes of moderate aerobic activity per week.</li>
                <li><strong>Strength Training:</strong> This helps build and maintain strong muscles and bones. Examples include lifting weights, using resistance bands, and bodyweight exercises like push-ups and squats. Aim for strength training twice a week.</li>
                <li><strong>Flexibility and Balance:</strong> These exercises help maintain a good range of motion and can prevent falls. Examples include stretching, yoga, and tai chi.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Importance of Quality Sleep</h3>
            <p>Sleep is not a luxury; it's a biological necessity. During sleep, your body works to support healthy brain function and maintain your physical health. Adults should aim for 7-9 hours of quality sleep per night.</p>
            <ul>
                <li><strong>Consistent Schedule:</strong> Go to bed and wake up at the same time every day, even on weekends.</li>
                <li><strong>Create a Restful Environment:</strong> Keep your bedroom dark, quiet, and cool.</li>
                <li><strong>Limit Screen Time:</strong> Avoid screens (phones, TVs, computers) for at least an hour before bed.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Regular Health Check-ups</h3>
            <p>
                Preventive care is crucial. Regular check-ups can help find problems before they start. They also can help find problems early, when your chances for treatment and cure are better. Talk to your doctor about what screenings are right for you.
            </p>
        </div>
    </>
);

const MentalHealthModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">Nurturing Your Mental Health</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make healthy choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">Understanding Common Conditions</h3>
            <p>It's important to recognize the signs of common mental health challenges.</p>
            <ul>
                <li><strong>Anxiety:</strong> Characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. While occasional anxiety is normal, persistent, excessive worry may indicate an anxiety disorder.</li>
                <li><strong>Depression:</strong> A mood disorder that causes a persistent feeling of sadness and loss of interest. It can affect how you feel, think and behave and can lead to a variety of emotional and physical problems.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Techniques for Managing Stress</h3>
            <p>Stress is a normal part of life, but chronic stress can take a toll on your health. Learning to manage it is key.</p>
            <ul>
                <li><strong>Mindfulness and Meditation:</strong> These practices involve focusing on your breath and being aware of the present moment without judgment. Even a few minutes a day can help reduce stress.</li>
                <li><strong>Physical Activity:</strong> Exercise is a powerful stress reliever. It can boost your mood and improve your health.</li>
                <li><strong>Connect with Others:</strong> Spend time with friends or family who are supportive and positive. Social connection is a great buffer against stress.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">When to Seek Help</h3>
            <p>
                It is a sign of strength to seek help for a mental health problem. If you are experiencing symptoms that are affecting your ability to function, it's important to talk to a mental health professional. Therapy, medication, or a combination of both can be very effective.
            </p>
        </div>
    </>
);

const LifestyleDiseasesModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">Preventing Lifestyle Diseases</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Lifestyle diseases, also known as non-communicable diseases (NCDs), are diseases that are largely based on the day-to-day habits of people. They are a result of an inappropriate relationship of people with their environment. The main factors contributing to lifestyle diseases include bad food habits, physical inactivity, and smoking/alcohol consumption.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">Common Lifestyle Diseases</h3>
            <ul>
                <li><strong>Type 2 Diabetes:</strong> A condition where the body doesn't use insulin properly, leading to high blood sugar levels.</li>
                <li><strong>Hypertension (High Blood Pressure):</strong> A condition in which the force of the blood against the artery walls is too high.</li>
                <li><strong>Heart Disease:</strong> A range of conditions that affect your heart, including coronary artery disease and heart failure.</li>
                <li><strong>Obesity:</strong> A complex disease involving an excessive amount of body fat.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Key Prevention Strategies</h3>
            <p>The good news is that many lifestyle diseases are preventable. Small changes can make a big difference.</p>
            <ul>
                <li><strong>Healthy Diet:</strong> Focus on a diet rich in fruits, vegetables, whole grains, and lean proteins. Limit processed foods, sugary drinks, and unhealthy fats.</li>
                <li><strong>Regular Physical Activity:</strong> Aim for at least 30 minutes of moderate-intensity exercise most days of the week.</li>
                <li><strong>Maintain a Healthy Weight:</strong> Keeping your weight in a healthy range can lower your risk for many diseases.</li>
                <li><strong>Avoid Tobacco and Limit Alcohol:</strong> Smoking and excessive alcohol use are major risk factors for many NCDs.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">The Importance of Early Detection</h3>
            <p>
                Regular health screenings are vital for early detection. Knowing your numbers—like blood pressure, cholesterol, and blood sugar—can help you and your doctor make informed decisions about your health.
            </p>
        </div>
    </>
);

const WCDModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">Women's and Child's Health</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Focusing on the health of women and children is crucial for building a healthy society. Their health needs are unique and require special attention throughout their life stages.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">Key Areas in Women's Health</h3>
            <ul>
                <li><strong>Menstrual Hygiene:</strong> Proper hygiene during menstruation is vital to prevent infections. Using clean materials and changing them regularly is important.</li>
                <li><strong>Reproductive Health:</strong> This includes access to family planning, prenatal care during pregnancy, and safe childbirth. Regular check-ups with a gynecologist are recommended.</li>
                <li><strong>Nutrition:</strong> Women have specific nutritional needs, especially during pregnancy and lactation. Iron, calcium, and folic acid are particularly important.</li>
                <li><strong>Preventive Screenings:</strong> Regular screenings like Pap smears for cervical cancer and mammograms for breast cancer can save lives.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Foundations of Child Health</h3>
            <ul>
                <li><strong>Immunization:</strong> Vaccinations are one of the most effective ways to protect children from serious diseases. Following the recommended immunization schedule is critical.</li>
                <li><strong>Nutrition:</strong> A balanced diet is essential for a child's growth and development. Breastfeeding is recommended for the first six months, followed by the introduction of nutritious solid foods.</li>
                <li><strong>Growth Monitoring:</strong> Regular monitoring of a child's height and weight helps ensure they are growing properly and can help identify potential health issues early.</li>
                <li><strong>Hygiene and Sanitation:</strong> Teaching children good hygiene practices, like handwashing, can prevent many common illnesses.</li>
            </ul>
        </div>
    </>
);

const OtherModuleContent = () => (
    <>
        <h2 className="text-3xl font-bold mb-4">General Health and Hygiene</h2>
        <div className="prose max-w-none prose-lg text-gray-700">
            <p>
                Beyond specific topics like nutrition and exercise, general health and hygiene practices form the foundation of a healthy life. These simple habits can protect you from a wide range of illnesses and contribute to your overall well-being.
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-3">Hand Hygiene: Your First Line of Defense</h3>
            <p>Washing your hands is one of the easiest and most effective ways to prevent the spread of germs.</p>
            <ul>
                <li><strong>When to Wash:</strong> Before eating, after using the restroom, after coughing or sneezing, and after touching public surfaces.</li>
                <li><strong>How to Wash:</strong> Use soap and water, and scrub for at least 20 seconds. If soap and water are not available, use an alcohol-based hand sanitizer with at least 60% alcohol.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Oral and Dental Care</h3>
            <p>Good oral hygiene can prevent cavities, gum disease, and bad breath. It's also linked to your overall health.</p>
            <ul>
                <li><strong>Brushing:</strong> Brush your teeth twice a day with fluoride toothpaste.</li>
                <li><strong>Flossing:</strong> Floss daily to remove plaque from between your teeth and under the gumline.</li>
                <li><strong>Regular Check-ups:</strong> Visit your dentist regularly for cleanings and check-ups.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-3">Basic First Aid Knowledge</h3>
            <p>
                Knowing basic first aid can help you respond to common, minor injuries and could even save a life. Consider learning how to handle cuts, burns, sprains, and how to perform CPR.
            </p>
        </div>
    </>
);

const WellnessContent = () => {
    const { topic, purpose } = useParams();
    const navigate = useNavigate();

    // Capitalize first letter of each word for display
    const formatTitle = (text) => {
        if (!text) return '';
        return text.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const renderModuleContent = () => {
        if (purpose !== 'modules') {
            if (purpose === 'games') {
                const questions = quizData[topic];
                if (questions) {
                    return <QuizGame questions={questions} />;
                } else {
                    return (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Quiz Coming Soon!</h2>
                            <p className="text-gray-600">A quiz for the "{formatTitle(topic)}" module is not yet available. Please check back later.</p>
                        </div>
                    );
                }
            }
            // Fallback for other purposes
            return <p>Content for {formatTitle(purpose)} will be displayed here.</p>;
        }

        switch (topic) {
            case 'nutrition':
                return <NutritionModuleContent />;
            case 'physical-health':
                return <PhysicalHealthModuleContent />;
            case 'mental-health':
                return <MentalHealthModuleContent />;
            case 'lifestyle-diseases':
                return <LifestyleDiseasesModuleContent />;
            case 'wcd':
                return <WCDModuleContent />;
            case 'other':
                return <OtherModuleContent />;
            default:
                return (
                    <h2 className="text-3xl font-bold mb-4">
                        Module not found for: {formatTitle(topic)}
                    </h2>
                );
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b" style={{ backgroundColor: "#1d3878" }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate("/wellnesssidebar")} className="flex items-center mr-4 p-1 text-white hover:bg-blue-500 rounded-lg">
                        <ArrowLeft className="w-5 h-5 m-1" />
                    </button>
                    <h1 className="text-xl font-bold text-white items-center">
                        {formatTitle(topic)} - {formatTitle(purpose)}
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {renderModuleContent()}
                </div>
            </main>
        </div>
    );
};

export default WellnessContent;
