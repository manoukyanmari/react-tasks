import React from 'react';

const LabelStrip = ({ labels }) => {
	const labelItems = labels.map((label, idx) => {
		return <label className={`label-${label.name}`}
									key={idx}>{label.name}</label>;
	});

	return (
		<section className="label-strip">
			{labelItems}
		</section>
	);
}

export default LabelStrip;
