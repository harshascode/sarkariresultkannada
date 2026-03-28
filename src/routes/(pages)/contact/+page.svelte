<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string} [description]
	 * @property {string} [url]
	 */

	/** @type {Props} */
	let {
		title = 'Mkvcinemas Contact us',
		description = 'Mkvcinemas Contact us',
		url = 'https://mkvcinemas1.com/contact'
	} = $props();

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	function handleSubmit(event) {
		event.preventDefault();
		// Handle the form submission here
		console.log({ name, email, subject, message });
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta name="keywords" content="mkvcinemas, mkvcinemas contact" />
</svelte:head>

<div class="flex items-center justify-center p-12">
	<div class="mx-auto w-full max-w-136">
		<form onsubmit={handleSubmit}>
			<div class="mb-5">
				<label for="name" class="mb-3 block text-base font-medium"> Full Name </label>
				<input
					type="text"
					bind:value={name}
					id="name"
					placeholder="Full Name"
					class="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md bg-gray-900"
				/>
			</div>
			<div class="mb-5">
				<label for="email" class="mb-3 block text-base font-medium"> Email Address </label>
				<input
					type="email"
					bind:value={email}
					id="email"
					placeholder="example@domain.com"
					class="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md bg-gray-900"
				/>
			</div>
			<div class="mb-5">
				<label for="subject" class="mb-3 block text-base font-medium"> Subject </label>
				<input
					type="text"
					bind:value={subject}
					id="subject"
					placeholder="Enter your subject"
					class="w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md bg-gray-900"
				/>
			</div>
			<div class="mb-5">
				<label for="message" class="mb-3 block text-base font-medium"> Message </label>
				<textarea
					rows="4"
					bind:value={message}
					id="message"
					placeholder="Type your message"
					class="w-full resize-none rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md bg-gray-900"
				></textarea>
			</div>
			<div>
				<button
					type="submit"
					class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>