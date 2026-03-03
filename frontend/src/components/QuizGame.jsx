import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const QuizGame = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleSelectAnswer = (option) => {
        if (isAnswerChecked) return;
        setSelectedAnswer(option);
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;
        setIsAnswerChecked(true);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
    }

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-xl mb-6">Your final score is: <span className="font-bold text-blue-600">{score}</span> out of {questions.length}</p>
                <button
                    onClick={handleRestart}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold shadow"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4">
                <p className="text-lg text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <h3 className="text-2xl font-semibold mt-2">{currentQuestion.question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = option === selectedAnswer;

                    let buttonClass = "p-4 rounded-lg border-2 text-left transition-all duration-300";
                    if (isAnswerChecked) {
                        if (isCorrect) {
                            buttonClass += " bg-green-100 border-green-500 text-green-800";
                        } else if (isSelected) {
                            buttonClass += " bg-red-100 border-red-500 text-red-800";
                        } else {
                            buttonClass += " border-gray-300 text-gray-700 opacity-60";
                        }
                    } else {
                        if (isSelected) {
                            buttonClass += " bg-blue-100 border-blue-500";
                        } else {
                            buttonClass += " border-gray-300 hover:bg-gray-100 hover:border-gray-400";
                        }
                    }

                    return (
                        <button key={index} onClick={() => handleSelectAnswer(option)} className={buttonClass} disabled={isAnswerChecked}>
                            <span className="font-medium">{option}</span>
                            {isAnswerChecked && (
                                <span className="float-right">
                                    {isCorrect ? <CheckCircle className="text-green-600" /> : isSelected && <XCircle className="text-red-600" />}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-end items-center">
                {isAnswerChecked ? (
                    <button onClick={handleNextQuestion} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-lg font-semibold shadow">
                        Next Question <ArrowRight />
                    </button>
                ) : (
                    <button onClick={handleCheckAnswer} disabled={!selectedAnswer} className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-lg font-semibold shadow disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Check Answer
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizGame;

