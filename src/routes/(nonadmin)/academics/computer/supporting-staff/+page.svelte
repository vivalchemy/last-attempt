<header>
	<h1>Department of Computer Engineering - Supporting Staff</h1>
</header>

<div class="container">
	<div class="staff-member">
		<img src="/computer/images/1.png" alt="MR. JITEN NAIK" />
		<div>
			<h4>MR. JITEN NAIK</h4>
			<h3>Lab Assistant</h3>
		</div>
	</div>
	<div class="staff-member">
		<img src="/computer/images/Screenshot (53).png" alt="MR. AJAY KOLI" />
		<div>
			<h4>MR. AJAY KOLI</h4>
			<h3>Lab Assistant</h3>
		</div>
	</div>
	<div class="staff-member">
		<img src="/computer/images/3.png" alt="MS. PANAK YADAV" />
		<div>
			<h4>MS. PANAK YADAV</h4>
			<h3>Mechanic computer Science</h3>
		</div>
	</div>
	<div class="staff-member">
		<img src="/computer/images/4.png" alt="MRS. POOJA BANEKAR" />
		<div>
			<h4>MRS. POOJA BANEKAR</h4>
			<h3>Lab Assistant</h3>
		</div>
	</div>
</div>

<style>
	/* Dark mode CSS styles with improved text appearance */
	body {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
		padding: 0;
		background-color: #222;
		color: #fff;
		line-height: 1.6;
	}

	header {
		background-color: #111;
		color: #fff;
		text-align: center;
		padding: 10px 0;
	}

	h1,
	h2,
	h3 {
		font-family: 'Roboto', Arial, sans-serif;
		font-weight: bold;
	}

	p,
	ul,
	li {
		font-size: 18px; /* Adjusted font size */
	}

	.container {
		max-width: 960px;
		margin: 0 auto;
		padding: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}

	.staff-member {
		display: flex;
		border: 1px solid #444;
		padding: 20px;
	}

	.staff-member img {
		width: 150px; /* Increased image width */
		height: auto;
		margin-right: 15px;
		flex-shrink: 0; /* Prevent image from shrinking */
	}

	.staff-member h4 {
		margin-bottom: 5px;
		font-size: 24px; /* Larger font size for staff name */
	}

	.staff-member h3 {
		margin-bottom: 10px;
		font-size: 18px; /* Smaller font size for staff job */
	}

	.staff-member strong {
		font-weight: bold;
		color: #99ff99; /* Adjusted color */
	}

	.staff-member p {
		flex: 1;
	}
</style>
