import React from "react";

const OverlappingImages = ({ images }) => {
    return (
        <div className="flex items-center justify-start">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md`}
                    style={{
                        marginLeft: index === 0 ? 0 : -8,
                    }}
                >
                    <img
                        src={image}
                        alt={`Person ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default OverlappingImages;
