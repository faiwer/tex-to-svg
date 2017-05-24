let mj, root;

function loadScript(src)
{
	return new Promise((resolve, reject) =>
		{
			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			(document.head || document.body).append(script);
		});
}

function loadMathJax()
{
	return loadScript(`${root}/MathJax.js`).then(() =>
		{
			mj = window.MathJax;

			mj.Ajax.config.root = '/mathjax/'; // static files
			mj.Hub.Config(
			{
				// turn off auto-replacing TeX on DOM Text Nodes
				skipStartupTypeset: true,
				// disable context-menu for formulas
				showMathMenu: false,
				// formates: from - to
				jax: ['input/TeX', 'output/SVG']
			});
		});
}

function genScript(formula)
{
	const script = document.createElement('script');
	script.type = 'math/tex';
	document.body.appendChild(script);
	script.textContent = formula;

	return script;
}

function process(script)
{
	return new Promise((resolve, reject) =>
		mj.Hub.Queue(() =>
		{
			mj.Hub.elementScripts = body => [script];
			return mj.Hub.Process(null, resolve);
		}));
}

function getBlock(script)
{
	return document.getElementById(script.id + '-Frame');
}

function clear(script)
{
	getBlock(script).remove();
	script.remove();
}

function getSVG(script)
{
	return getBlock(script).innerHTML;
}

export const setMathjaxRoot = src =>
	{ root = src; };

export async function renderMath(formula)
{
	if(!mj)
		await loadMathJax();
	const script = genScript(formula);

	try
	{
		await process(script);
		return getSVG(script);
	}
	finally { clear(script); }
}